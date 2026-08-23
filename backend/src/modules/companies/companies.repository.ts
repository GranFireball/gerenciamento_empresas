import { Injectable } from '@nestjs/common';
import { CompanyDto } from './schemas/company.schema';
import { CreateCompanyDto } from './schemas/create-company.schema';
import { UpdateCompanyDto } from './schemas/update-company.schema';
import { PrismaService } from '../../infra/database/prisma.service';

@Injectable()
export class CompaniesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCompanies(): Promise<CompanyDto[]> {
    return await this.prisma.companies.findMany();
  }

  async findCompanyById(id: string): Promise<CompanyDto | null> {
    return await this.prisma.companies.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async findCompanyByCnpj(cnpj: string): Promise<CompanyDto | null> {
    return await this.prisma.companies.findUnique({
      where: { cnpj, deletedAt: null },
    });
  }

  async createCompany(payload: CreateCompanyDto): Promise<CompanyDto> {
    return await this.prisma.companies.create({
      data: payload,
    });
  }

  async updateCompany(
    id: string,
    payload: UpdateCompanyDto,
  ): Promise<CompanyDto | null> {
    return await this.prisma.companies.update({
      where: { id, deletedAt: null },
      data: payload,
    });
  }

  async deleteCompany(id: string): Promise<CompanyDto | null> {
    return await this.prisma.companies.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
