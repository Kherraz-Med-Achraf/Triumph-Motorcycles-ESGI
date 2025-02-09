import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";

export class GetCompanyFromUserUseCase {
  constructor(
    private companyRepo: CompanyRepository,
    private userRepo: UserRepository
  ) {}

  async execute(userId: string): Promise<CompanyEntity> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const company = await this.companyRepo.findByUserId(userId);
    if (!company) {
      throw new CompanyNotFoundException();
    }

    return company;
  }
}
