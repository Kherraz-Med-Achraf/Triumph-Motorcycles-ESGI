import { Provider } from "@nestjs/common";
import { CreateCompanyUseCase } from "../../../../application/use-cases/company/CreateCompanyUseCase";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";

export const CreateCompanyUseCaseProvider: Provider = {
  provide: CreateCompanyUseCase,
  useFactory: (companyRepo: CompanyRepository) => {
    return new CreateCompanyUseCase(companyRepo);
  },
  inject: ["CompanyRepository"],
};
