import { v4 as uuidv4 } from "uuid";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { CreateCompanySchema, CreateCompanyDTO } from "./CreateCompanyDTO";
import { CompanyAlreadyExistsException } from "../../../domain/exceptions/company/CompanyAlreadyExistsException"; // ✅ Import exception

export class CreateCompanyUseCase {
  constructor(private companyRepo: CompanyRepository) {}

  async execute(input: CreateCompanyDTO): Promise<CompanyEntity> {
    const dto = CreateCompanySchema.parse(input);

    const existingCompany = await this.companyRepo.findByName(dto.name);
    if (existingCompany) {
      throw new CompanyAlreadyExistsException();
    }
    const company = new CompanyEntity(
      uuidv4(),
      dto.name,
      dto.address,
      new Date()
    );

    return await this.companyRepo.create(company);
  }
}
