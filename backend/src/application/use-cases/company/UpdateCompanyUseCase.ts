import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";
import { UpdateCompanyDTO, UpdateCompanySchema } from "./UpdateCompanyDTO";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";
import { CompanyUpdateFailedException } from "../../../domain/exceptions/company/CompanyUpdateFailedException";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { InvalidUserRoleException } from "../../../domain/exceptions/user/InvalidUserRoleException";

export class UpdateCompanyUseCase {
  constructor(
    private companyRepo: CompanyRepository,
    private userRepo: UserRepository
  ) {}

  async execute(companyId: string, input: UpdateCompanyDTO): Promise<CompanyEntity> {
    const dto = UpdateCompanySchema.parse(input);

    // Vérification que l'entreprise existe
    const existingCompany = await this.companyRepo.findById(companyId);
    if (!existingCompany) {
      throw new CompanyNotFoundException();
    }

    let newUserId = existingCompany.userId;
    if (dto.userId !== undefined) { 
      if (dto.userId === null) {
        newUserId = null;
      } else {
        const user = await this.userRepo.findById(dto.userId);
        if (!user) {
          throw new UserNotFoundException();
        }
        if (user.role !== "MANAGER_COMPANY") {
          throw new InvalidUserRoleException();
        }
        newUserId = dto.userId;
      }
    }


    const updatedCompany = new CompanyEntity(
      existingCompany.id,
      dto.name ?? existingCompany.name,
      dto.address ?? existingCompany.address,
      newUserId, 
      existingCompany.createdAt
    );


    const result = await this.companyRepo.update(updatedCompany);
    if (!result) {
      throw new CompanyUpdateFailedException();
    }

    return result;
  }
}
