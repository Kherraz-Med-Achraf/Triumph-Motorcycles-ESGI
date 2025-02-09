import { CompanyMotorcycleRepositoryProvider } from "./CompanyMotorcycleRepository.provider";

import { CreateCompanyMotorcycleUseCaseProvider } from "./CreateCompanyMotorcycleUseCase.provider";
import { GetCompanyMotorcycleUseCaseProvider } from "./GetCompanyMotorcycleUseCase.provider";
import { GetAllCompanyMotorcyclesUseCaseProvider } from "./GetAllCompanyMotorcyclesUseCase.provider";
import { GetCompanyMotorcyclesByCompanyUseCaseProvider } from "./GetCompanyMotorcyclesByCompanyUseCase.provider";
import { GetCompanyMotorcyclesByMotorcycleUseCaseProvider } from "./GetCompanyMotorcyclesByMotorcycleUseCase.provider";
import { UpdateCompanyMotorcycleUseCaseProvider } from "./UpdateCompanyMotorcycleUseCase.provider";
import { DeleteCompanyMotorcycleUseCaseProvider } from "./DeleteCompanyMotorcycleUseCase.provider";

export const CompanyMotorcycleProviders = [
  CompanyMotorcycleRepositoryProvider,
  CreateCompanyMotorcycleUseCaseProvider,
  GetCompanyMotorcycleUseCaseProvider,
  GetAllCompanyMotorcyclesUseCaseProvider,
  GetCompanyMotorcyclesByCompanyUseCaseProvider,
  GetCompanyMotorcyclesByMotorcycleUseCaseProvider,
  UpdateCompanyMotorcycleUseCaseProvider,
  DeleteCompanyMotorcycleUseCaseProvider,
];
