
import { v4 as uuidv4 } from "uuid";
import { CreateCompanyDTO, CreateCompanySchema } from "./CreateCompanyDTO";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";
import { ManagerUserNotFoundException } from "../../../domain/exceptions/ManagerUserNotFoundException";

export class CreateCompanyUseCase {
  constructor(
    private companyRepo: CompanyRepository,
    private userRepo: UserRepository 
  ) {}

  async execute(input: CreateCompanyDTO): Promise<CompanyEntity> {
    const dto = CreateCompanySchema.parse(input);

    const managerUser = await this.userRepo.findById(dto.managerUserId);

    if (!managerUser || managerUser.role !== "MANAGER_COMPANY") {
      throw new ManagerUserNotFoundException();
    }

    const newId = uuidv4();
    const company = new CompanyEntity(
      newId,
      dto.name,
      managerUser.id,
      new Date()
    );

    return await this.companyRepo.create(company);
  }
}
