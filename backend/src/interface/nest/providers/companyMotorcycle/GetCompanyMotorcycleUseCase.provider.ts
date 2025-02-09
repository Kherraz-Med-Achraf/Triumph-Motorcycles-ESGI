import { Provider } from "@nestjs/common";
import { GetCompanyMotorcycleUseCase } from "../../../../application/use-cases/companyMotorcycle/GetCompanyMotorcycleUseCase";
import { CompanyMotorcycleRepository } from "../../../../domain/repositories/CompanyMotorcycleRepository";

export const GetCompanyMotorcycleUseCaseProvider: Provider = {
  provide: GetCompanyMotorcycleUseCase,
  useFactory: (repo: CompanyMotorcycleRepository) => {
    return new GetCompanyMotorcycleUseCase(repo);
  },
  inject: ["CompanyMotorcycleRepository"],
};
