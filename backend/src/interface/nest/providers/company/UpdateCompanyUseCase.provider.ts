import { Provider } from "@nestjs/common";
import { UpdateCompanyUseCase } from "../../../../application/use-cases/company/UpdateCompanyUseCase";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";

export const UpdateCompanyUseCaseProvider: Provider = {
  provide: UpdateCompanyUseCase,
  useFactory: (companyRepo: CompanyRepository) => {
    return new UpdateCompanyUseCase(companyRepo);
  },
  inject: ["CompanyRepository"],
};
