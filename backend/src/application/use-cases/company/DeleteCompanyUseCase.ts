import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";

export class DeleteCompanyUseCase {
  constructor(private companyRepo: CompanyRepository) {}

  async execute(companyId: string): Promise<void> {
    const existingCompany = await this.companyRepo.findById(companyId);
    if (!existingCompany) {
      throw new CompanyNotFoundException();
    }

    await this.companyRepo.delete(companyId);
  }
}
