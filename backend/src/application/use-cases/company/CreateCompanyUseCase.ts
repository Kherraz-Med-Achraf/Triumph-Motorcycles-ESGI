import { v4 as uuidv4 } from "uuid";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateCompanySchema, CreateCompanyDTO } from "./CreateCompanyDTO";
import { CompanyAlreadyExistsException } from "../../../domain/exceptions/company/CompanyAlreadyExistsException";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { InvalidUserRoleException } from "../../../domain/exceptions/user/InvalidUserRoleException";

export class CreateCompanyUseCase {
  constructor(
    private companyRepo: CompanyRepository,
    private userRepo: UserRepository
  ) {}

  async execute(input: CreateCompanyDTO): Promise<CompanyEntity> {
    const dto = CreateCompanySchema.parse(input);

    const existingCompany = await this.companyRepo.findByName(dto.name);
    if (existingCompany) {
      throw new CompanyAlreadyExistsException();
    }

    let userId: string | null = null;
    if (dto.userId) {
      const user = await this.userRepo.findById(dto.userId);
      if (!user) {
        throw new UserNotFoundException();
      }
      if (user.role !== "MANAGER_COMPANY") {
        throw new InvalidUserRoleException();
      }
      userId = dto.userId;
    }

    const company = new CompanyEntity(
      uuidv4(),
      dto.name,
      dto.address,
      userId, 
      new Date()
    );

    return await this.companyRepo.create(company);
  }
}
