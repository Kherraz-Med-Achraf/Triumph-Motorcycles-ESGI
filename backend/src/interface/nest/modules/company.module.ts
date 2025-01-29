import { Module } from '@nestjs/common';
import { CompanyController } from '../controllers/company.controller';
import { CompanyUseCaseProviders } from '../providers/company/CompanyUseCaseProviders';

@Module({
  controllers: [CompanyController],
  providers: [...CompanyUseCaseProviders],
})
export class CompanyModule {}
