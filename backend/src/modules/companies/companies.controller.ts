import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { type Response } from 'express';

import { ZodValidationPipe } from '../../../src/common/pipes/zod.validation.pipe';

import {
  CreateCompanySchema,
  type CreateCompanyDto,
} from './schemas/create-company.schema';

import {
  UpdateCompanySchema,
  type UpdateCompanyDto,
} from './schemas/update-company.schema';

import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  private handleSucccess(
    res: Response,
    status: HttpStatus,
    message: string,
    data: unknown,
  ) {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  private handleError(res: Response, error: unknown, defaultMessage: string) {
    if (error instanceof HttpException) {
      return res.status(error.getStatus()).json({
        success: false,
        message: error.message,
      });
    }

    console.error(defaultMessage, error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: defaultMessage,
    });
  }

  @Get()
  async listCompanies(@Res() res: Response) {
    try {
      const companies = await this.companiesService.listCompanies();

      return this.handleSucccess(
        res,
        HttpStatus.OK,
        'Empresas listadas com sucesso.',
        companies,
      );
    } catch (error) {
      return this.handleError(res, error, 'Erro ao listar empresas.');
    }
  }

  @Get('/:id')
  async getCompany(@Param('id') id: string, @Res() res: Response) {
    try {
      const company = await this.companiesService.getCompany(id);

      return this.handleSucccess(
        res,
        HttpStatus.OK,
        'Empresa encontrada com sucesso.',
        company,
      );
    } catch (error) {
      return this.handleError(res, error, 'Erro ao buscar empresa.');
    }
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateCompanySchema))
    payload: CreateCompanyDto,
    @Res() res: Response,
  ) {
    try {
      const company = await this.companiesService.create(payload);

      return this.handleSucccess(
        res,
        HttpStatus.CREATED,
        'Empresa criada com sucesso.',
        company,
      );
    } catch (error) {
      return this.handleError(res, error, 'Erro ao criar empresa.');
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateCompanySchema))
    payload: UpdateCompanyDto,
    @Res() res: Response,
  ) {
    try {
      const company = await this.companiesService.update(id, payload);

      return this.handleSucccess(
        res,
        HttpStatus.OK,
        'Empresa atualizada com sucesso.',
        company,
      );
    } catch (error) {
      return this.handleError(res, error, 'Erro ao atualizar empresa.');
    }
  }

  @Put('/:id/delete')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const company = await this.companiesService.delete(id);

      return this.handleSucccess(
        res,
        HttpStatus.OK,
        'Empresa deletada com sucesso.',
        company,
      );
    } catch (error) {
      return this.handleError(res, error, 'Erro ao deletar empresa.');
    }
  }
}
