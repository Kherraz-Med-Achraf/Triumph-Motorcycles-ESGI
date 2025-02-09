import { Provider } from "@nestjs/common";
import { DeleteCompanyMotorcycleUseCase } from "../../../../application/use-cases/companyMotorcycle/DeleteCompanyMotorcycleUseCase";
import { CompanyMotorcycleRepository } from "../../../../domain/repositories/CompanyMotorcycleRepository";

export const DeleteCompanyMotorcycleUseCaseProvider: Provider = {
  provide: DeleteCompanyMotorcycleUseCase,
  useFactory: (repo: CompanyMotorcycleRepository) => {
    return new DeleteCompanyMotorcycleUseCase(repo);
  },
  inject: ["CompanyMotorcycleRepository"],
};
