import { Provider } from "@nestjs/common";
import { GetAllCompanyMotorcyclesUseCase } from "../../../../application/use-cases/companyMotorcycle/GetAllCompanyMotorcyclesUseCase";
import { CompanyMotorcycleRepository } from "../../../../domain/repositories/CompanyMotorcycleRepository";

export const GetAllCompanyMotorcyclesUseCaseProvider: Provider = {
  provide: GetAllCompanyMotorcyclesUseCase,
  useFactory: (repo: CompanyMotorcycleRepository) => {
    return new GetAllCompanyMotorcyclesUseCase(repo);
  },
  inject: ["CompanyMotorcycleRepository"],
};
