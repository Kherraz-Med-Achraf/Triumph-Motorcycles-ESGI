import { Provider } from "@nestjs/common";
import { GetAllCompaniesUseCase } from "../../../../application/use-cases/company/GetAllCompaniesUseCase";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";

export const GetAllCompaniesUseCaseProvider: Provider = {
  provide: GetAllCompaniesUseCase,
  useFactory: (companyRepo: CompanyRepository) => {
    return new GetAllCompaniesUseCase(companyRepo);
  },
  inject: ["CompanyRepository"],
};
