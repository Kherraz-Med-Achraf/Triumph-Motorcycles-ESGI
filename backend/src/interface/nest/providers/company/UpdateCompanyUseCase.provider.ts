import { Provider } from "@nestjs/common";
import { UpdateCompanyUseCase } from "../../../../application/use-cases/company/UpdateCompanyUseCase";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const UpdateCompanyUseCaseProvider: Provider = {
  provide: UpdateCompanyUseCase,
  useFactory: (companyRepo: CompanyRepository, userRepo: UserRepository) => {
    return new UpdateCompanyUseCase(companyRepo, userRepo);
  },
  inject: ["CompanyRepository", "UserRepository"],
};
