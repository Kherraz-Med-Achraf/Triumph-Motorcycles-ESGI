import { Provider } from "@nestjs/common";
import { GetCompanyFromUserUseCase } from "../../../../application/use-cases/company/GetCompanyFromUserUseCase";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const GetCompanyFromUserUseCaseProvider: Provider = {
  provide: GetCompanyFromUserUseCase,
  useFactory: (companyRepo: CompanyRepository, userRepo: UserRepository) => {
    return new GetCompanyFromUserUseCase(companyRepo, userRepo);
  },
  inject: ["CompanyRepository", "UserRepository"],
};
