import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";

export class GetCompanyUseCase {
  constructor(private companyRepo: CompanyRepository) {}

  async execute(companyId: string): Promise<CompanyEntity> {
    const company = await this.companyRepo.findById(companyId);
    if (!company) {
      throw new CompanyNotFoundException();
    }
    return company;
  }
}
