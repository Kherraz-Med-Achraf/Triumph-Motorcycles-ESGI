import { Provider } from "@nestjs/common";
import { UpdateCompanyMotorcycleUseCase } from "../../../../application/use-cases/companyMotorcycle/UpdateCompanyMotorcycleUseCase";
import { CompanyMotorcycleRepository } from "../../../../domain/repositories/CompanyMotorcycleRepository";

export const UpdateCompanyMotorcycleUseCaseProvider: Provider = {
  provide: UpdateCompanyMotorcycleUseCase,
  useFactory: (repo: CompanyMotorcycleRepository) => {
    return new UpdateCompanyMotorcycleUseCase(repo);
  },
  inject: ["CompanyMotorcycleRepository"],
};
