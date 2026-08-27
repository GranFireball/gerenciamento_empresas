import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesRepository } from './companies.repository';
import { PrismaModule } from '../../infra/database/prisma.module';
import { EmailModule } from '../email/emai.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository],
})
export class CompaniesModule {}
