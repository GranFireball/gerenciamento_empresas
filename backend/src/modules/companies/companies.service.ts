import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyDto } from './schemas/company.schema';
import { CompaniesRepository } from './companies.repository';
import { CreateCompanyDto } from './schemas/create-company.schema';
import { UpdateCompanyDto } from './schemas/update-company.schema';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async listCompanies(): Promise<CompanyDto[]> {
    return await this.companiesRepository.findCompanies();
  }

  async getCompany(id: string): Promise<CompanyDto | null> {
    const company = await this.companiesRepository.findCompanyById(id);

    if (!company) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    return company;
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyDto> {
    const { cnpj } = createCompanyDto;

    const existingCompany =
      await this.companiesRepository.findCompanyByCnpj(cnpj);

    if (existingCompany) {
      throw new ConflictException('Empresa com este CNPJ já existe.');
    }

    return await this.companiesRepository.createCompany(createCompanyDto);
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyDto | null> {
    const existingCompany = await this.companiesRepository.findCompanyById(id);

    if (!existingCompany) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    return await this.companiesRepository.updateCompany(id, updateCompanyDto);
  }

  async delete(id: string): Promise<CompanyDto | null> {
    const existingCompany = await this.companiesRepository.findCompanyById(id);

    if (!existingCompany) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    return await this.companiesRepository.deleteCompany(id);
  }
}
