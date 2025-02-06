import { Provider } from "@nestjs/common";
import { GetCompanyUseCase } from "../../../../application/use-cases/company/GetCompanyUseCase";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";

export const GetCompanyUseCaseProvider: Provider = {
  provide: GetCompanyUseCase,
  useFactory: (companyRepo: CompanyRepository) => {
    return new GetCompanyUseCase(companyRepo);
  },
  inject: ["CompanyRepository"], 
};
