import { Provider } from "@nestjs/common";
import { DeleteCompanyUseCase } from "../../../../application/use-cases/company/DeleteCompanyUseCase";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";

export const DeleteCompanyUseCaseProvider: Provider = {
  provide: DeleteCompanyUseCase,
  useFactory: (companyRepo: CompanyRepository) => {
    return new DeleteCompanyUseCase(companyRepo);
  },
  inject: ["CompanyRepository"],
};
