/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { CompaniesRepository } from './companies.repository';
import { CompaniesService } from './companies.service';
import { EmailSerivce } from '../email/email.service';

const mockCompaniesRepository = () => ({
  findCompanies: jest.fn(),
  findCompanyById: jest.fn(),
  findCompanyByCnpj: jest.fn(),
  createCompany: jest.fn(),
  updateCompany: jest.fn(),
  deleteCompany: jest.fn(),
});

const mockEmailService = () => ({
  sendEmail: jest.fn(),
});

describe('CompaniesService', () => {
  let companiesService: CompaniesService;
  let repository: jest.Mocked<CompaniesRepository>;
  let emailService: jest.Mocked<EmailSerivce>;

  const mockCompanies = [
    {
      id: '1',
      name: 'Empresa 1',
      cnpj: '12345678901234',
      fantasyName: 'Nome fantasia 1',
      address: 'Rua 1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: '2',
      name: 'Empresa 2',
      cnpj: '98765432109876',
      fantasyName: 'Nome fantasia 2',
      address: 'Rua 2',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CompaniesService,
        { provide: CompaniesRepository, useValue: mockCompaniesRepository() },
        { provide: EmailSerivce, useValue: mockEmailService() },
      ],
    }).compile();

    companiesService = module.get(CompaniesService);
    repository = module.get(CompaniesRepository);
    emailService = module.get(EmailSerivce);
  });

  describe('listCompanies', () => {
    it('should return an array of companies', async () => {
      repository.findCompanies.mockResolvedValue(mockCompanies);
      const result = await companiesService.listCompanies();
      expect(result).toEqual(mockCompanies);
      expect(repository.findCompanies).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no companies are found', async () => {
      repository.findCompanies.mockResolvedValue([]);
      const result = await companiesService.listCompanies();
      expect(result).toEqual([]);
      expect(repository.findCompanies).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCompany', () => {
    it('should return a company by id', async () => {
      const companyId = mockCompanies[0].id;
      repository.findCompanyById.mockResolvedValue(mockCompanies[0]);
      const result = await companiesService.getCompany(companyId);
      expect(result).toEqual(mockCompanies[0]);
      expect(repository.findCompanyById).toHaveBeenCalledWith(companyId);
      expect(repository.findCompanyById).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if company is not found', async () => {
      const companyId = '3';
      repository.findCompanyById.mockResolvedValue(null);
      await expect(companiesService.getCompany(companyId)).rejects.toThrow(
        'Empresa não encontrada.',
      );
      expect(repository.findCompanyById).toHaveBeenCalledWith(companyId);
      expect(repository.findCompanyById).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new company and send email', async () => {
      const payload = {
        name: 'Empresa 3',
        cnpj: '11122233344455',
        fantasyName: 'Nome fantasia 3',
        address: 'Rua 3',
      };
      const createdCompany = {
        ...mockCompanies[0],
        id: '3',
        ...payload,
      };
      repository.findCompanyByCnpj.mockResolvedValue(null);
      repository.createCompany.mockResolvedValue(createdCompany);
      const result = await companiesService.create(payload);
      expect(result).toEqual(createdCompany);
      expect(repository.findCompanyByCnpj).toHaveBeenCalledWith(payload.cnpj);
      expect(repository.findCompanyByCnpj).toHaveBeenCalledTimes(1);
      expect(repository.createCompany).toHaveBeenCalledWith(payload);
      expect(repository.createCompany).toHaveBeenCalledTimes(1);
      expect(emailService.sendEmail).toHaveBeenCalledWith(createdCompany);
      expect(emailService.sendEmail).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException and not send email if a company with the same CNPJ already exists', async () => {
      const payload = {
        name: 'Empresa 3',
        cnpj: mockCompanies[0].cnpj,
        fantasyName: 'Nome fantasia 3',
        address: 'Rua 3',
      };
      repository.findCompanyByCnpj.mockResolvedValue(mockCompanies[0]);
      await expect(companiesService.create(payload)).rejects.toThrow(
        'Empresa com este CNPJ já existe.',
      );
      expect(repository.findCompanyByCnpj).toHaveBeenCalledWith(payload.cnpj);
      expect(repository.findCompanyByCnpj).toHaveBeenCalledTimes(1);
      expect(repository.createCompany).not.toHaveBeenCalled();
      expect(emailService.sendEmail).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing company changing cnpj ', async () => {
      const companyId = mockCompanies[0].id;
      const payload = {
        name: 'Empresa 1 Atualizada',
        cnpj: '11122233344455',
        fantasyName: 'Nome fantasia 1 Atualizado',
        address: 'Rua 1 Atualizada',
      };
      const updatedCompany = {
        ...mockCompanies[0],
        ...payload,
      };
      repository.findCompanyById.mockResolvedValue(mockCompanies[0]);
      repository.updateCompany.mockResolvedValue(updatedCompany);
      const result = await companiesService.update(companyId, payload);
      expect(result).toEqual(updatedCompany);
      expect(repository.findCompanyById).toHaveBeenCalledWith(companyId);
      expect(repository.findCompanyById).toHaveBeenCalledTimes(1);
      expect(repository.findCompanyByCnpj).toHaveBeenCalledWith(payload.cnpj);
      expect(repository.findCompanyByCnpj).toHaveBeenCalledTimes(1);
      expect(repository.updateCompany).toHaveBeenCalledWith(companyId, payload);
      expect(repository.updateCompany).toHaveBeenCalledTimes(1);
    });

    it('should update an existing company without changing cnpj', async () => {
      const companyId = mockCompanies[0].id;
      const payload = {
        name: 'Empresa 1 Atualizada',
        cnpj: mockCompanies[0].cnpj,
        fantasyName: 'Nome fantasia 1 Atualizado',
        address: 'Rua 1 Atualizada',
      };
      const updatedCompany = {
        ...mockCompanies[0],
        ...payload,
      };
      repository.findCompanyById.mockResolvedValue(mockCompanies[0]);
      repository.updateCompany.mockResolvedValue(updatedCompany);
      const result = await companiesService.update(companyId, payload);
      expect(result).toEqual(updatedCompany);
      expect(repository.findCompanyById).toHaveBeenCalledWith(companyId);
      expect(repository.findCompanyById).toHaveBeenCalledTimes(1);
      expect(repository.findCompanyByCnpj).not.toHaveBeenCalled();
      expect(repository.updateCompany).toHaveBeenCalledWith(companyId, payload);
      expect(repository.updateCompany).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if company is not found', async () => {
      const companyId = '3';
      const payload = {
        name: 'Empresa 3 Atualizada',
        cnpj: '11122233344455',
        fantasyName: 'Nome fantasia 3 Atualizado',
        address: 'Rua 3 Atualizada',
      };
      repository.findCompanyById.mockResolvedValue(null);
      await expect(companiesService.update(companyId, payload)).rejects.toThrow(
        'Empresa não encontrada.',
      );
      expect(repository.findCompanyById).toHaveBeenCalledWith(companyId);
      expect(repository.findCompanyById).toHaveBeenCalledTimes(1);
      expect(repository.findCompanyByCnpj).not.toHaveBeenCalled();
      expect(repository.updateCompany).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if changes cnpj with a CNPJ already exists', async () => {
      const companyId = mockCompanies[0].id;
      const payload = {
        name: 'Empresa 1 Atualizada',
        cnpj: mockCompanies[1].cnpj,
        fantasyName: 'Nome fantasia 1 Atualizado',
        address: 'Rua 1 Atualizada',
      };
      repository.findCompanyById.mockResolvedValue(mockCompanies[0]);
      repository.findCompanyByCnpj.mockResolvedValue(mockCompanies[1]);
      await expect(companiesService.update(companyId, payload)).rejects.toThrow(
        'Empresa com este CNPJ já existe.',
      );
      expect(repository.findCompanyById).toHaveBeenCalledWith(companyId);
      expect(repository.findCompanyById).toHaveBeenCalledTimes(1);
      expect(repository.findCompanyByCnpj).toHaveBeenCalledWith(payload.cnpj);
      expect(repository.findCompanyByCnpj).toHaveBeenCalledTimes(1);
      expect(repository.updateCompany).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete an existing company', async () => {
      const companyId = mockCompanies[0].id;
      const deletedCompany = {
        ...mockCompanies[0],
        deletedAt: new Date(),
      };
      repository.findCompanyById.mockResolvedValue(mockCompanies[0]);
      repository.deleteCompany.mockResolvedValue(deletedCompany);
      const result = await companiesService.delete(companyId);
      expect(result).toEqual(deletedCompany);
      expect(repository.findCompanyById).toHaveBeenCalledWith(companyId);
      expect(repository.findCompanyById).toHaveBeenCalledTimes(1);
      expect(repository.deleteCompany).toHaveBeenCalledWith(companyId);
      expect(repository.deleteCompany).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException if company is not found', async () => {
      const companyId = '3';
      repository.findCompanyById.mockResolvedValue(null);
      await expect(companiesService.delete(companyId)).rejects.toThrow(
        'Empresa não encontrada.',
      );
      expect(repository.findCompanyById).toHaveBeenCalledWith(companyId);
      expect(repository.findCompanyById).toHaveBeenCalledTimes(1);
      expect(repository.deleteCompany).not.toHaveBeenCalled();
    });
  });
});
