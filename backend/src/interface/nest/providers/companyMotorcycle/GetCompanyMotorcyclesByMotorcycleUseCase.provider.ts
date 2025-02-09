import { Provider } from "@nestjs/common";
import { GetCompanyMotorcyclesByMotorcycleUseCase } from "../../../../application/use-cases/companyMotorcycle/GetCompanyMotorcyclesByMotorcycleUseCase";
import { CompanyMotorcycleRepository } from "../../../../domain/repositories/CompanyMotorcycleRepository";

export const GetCompanyMotorcyclesByMotorcycleUseCaseProvider: Provider = {
  provide: GetCompanyMotorcyclesByMotorcycleUseCase,
  useFactory: (repo: CompanyMotorcycleRepository) => {
    return new GetCompanyMotorcyclesByMotorcycleUseCase(repo);
  },
  inject: ["CompanyMotorcycleRepository"],
};
