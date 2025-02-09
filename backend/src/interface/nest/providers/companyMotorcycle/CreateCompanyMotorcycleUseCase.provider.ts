import { Provider } from "@nestjs/common";
import { CreateCompanyMotorcycleUseCase } from "../../../../application/use-cases/companyMotorcycle/CreateCompanyMotorcycleUseCase";
import { CompanyMotorcycleRepository } from "../../../../domain/repositories/CompanyMotorcycleRepository";

export const CreateCompanyMotorcycleUseCaseProvider: Provider = {
  provide: CreateCompanyMotorcycleUseCase,
  useFactory: (repo: CompanyMotorcycleRepository) => {
    return new CreateCompanyMotorcycleUseCase(repo);
  },
  inject: ["CompanyMotorcycleRepository"],
};
