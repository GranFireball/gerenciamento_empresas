import { Module } from '@nestjs/common';
import { CompaniesModule } from './modules/companies/companies.module';

@Module({
  imports: [CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
