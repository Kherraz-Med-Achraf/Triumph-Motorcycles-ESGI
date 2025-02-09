import { Provider } from "@nestjs/common";
import { GetCompanyMotorcyclesByCompanyUseCase } from "../../../../application/use-cases/companyMotorcycle/GetCompanyMotorcyclesByCompanyUseCase";
import { CompanyMotorcycleRepository } from "../../../../domain/repositories/CompanyMotorcycleRepository";

export const GetCompanyMotorcyclesByCompanyUseCaseProvider: Provider = {
  provide: GetCompanyMotorcyclesByCompanyUseCase,
  useFactory: (repo: CompanyMotorcycleRepository) => {
    return new GetCompanyMotorcyclesByCompanyUseCase(repo);
  },
  inject: ["CompanyMotorcycleRepository"],
};
