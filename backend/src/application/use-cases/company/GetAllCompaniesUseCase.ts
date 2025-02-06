import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";

export class GetAllCompaniesUseCase {
  constructor(private companyRepo: CompanyRepository) {}

  async execute(): Promise<CompanyEntity[]> {
    return await this.companyRepo.findAll();
  }
}
