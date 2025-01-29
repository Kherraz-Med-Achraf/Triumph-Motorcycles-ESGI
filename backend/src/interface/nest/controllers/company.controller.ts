import { Controller, Post, Body } from '@nestjs/common';
import { CreateCompanyUseCase, CreateCompanyDTO } from '../../../application/use-cases/company/CreateCompanyUseCase';

@Controller('companies')
export class CompanyController {
  constructor(private readonly createCompanyUseCase: CreateCompanyUseCase) {}

  @Post()
  async create(@Body() dto: CreateCompanyDTO) {
    const company = await this.createCompanyUseCase.execute(dto);
    return { message: 'Company created', company };
  }
}
