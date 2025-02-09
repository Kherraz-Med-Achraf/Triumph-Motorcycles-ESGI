import { Provider } from "@nestjs/common";
import { CreateCompanyUseCase } from "../../../../application/use-cases/company/CreateCompanyUseCase";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";
import { UserRepository} from "../../../../domain/repositories/UserRepository";

export const CreateCompanyUseCaseProvider: Provider = {
  provide: CreateCompanyUseCase,
  useFactory: (companyRepo: CompanyRepository, userRepo: UserRepository) => {
    return new CreateCompanyUseCase(companyRepo, userRepo);
  },
  inject: ["CompanyRepository", "UserRepository"],
};
