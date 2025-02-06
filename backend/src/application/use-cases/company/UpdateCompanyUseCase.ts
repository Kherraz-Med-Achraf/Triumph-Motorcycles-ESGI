import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";
import { UpdateCompanyDTO, UpdateCompanySchema } from "./UpdateCompanyDTO";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";
import { CompanyUpdateFailedException } from "../../../domain/exceptions/company/CompanyUpdateFailedException";

export class UpdateCompanyUseCase {
  constructor(private companyRepo: CompanyRepository) {}

  async execute(companyId: string, input: UpdateCompanyDTO): Promise<CompanyEntity> {
    const dto = UpdateCompanySchema.parse(input);

    const existingCompany = await this.companyRepo.findById(companyId);
    if (!existingCompany) {
      throw new CompanyNotFoundException();
    }

    const updatedCompany = new CompanyEntity(
      existingCompany.id,
      dto.name ?? existingCompany.name,
      dto.address ?? existingCompany.address,
      existingCompany.createdAt
    );

    const result = await this.companyRepo.update(updatedCompany);
    if (!result) {
      throw new CompanyUpdateFailedException();
    }

    return result;
  }
}
