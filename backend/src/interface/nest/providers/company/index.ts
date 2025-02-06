import { CompanyRepositoryProvider } from "./CompanyRepository.provider";
import { CreateCompanyUseCaseProvider } from "./CreateCompanyUseCase.provider";
import { GetAllCompaniesUseCaseProvider } from "./GetAllCompaniesUseCase.provider";
import { GetCompanyUseCaseProvider } from "./GetCompanyUseCase.provider";
import { UpdateCompanyUseCaseProvider } from "./UpdateCompanyUseCase.provider";
import { DeleteCompanyUseCaseProvider } from "./DeleteCompanyUseCase.provider";

export const CompanyProviders = [
  CompanyRepositoryProvider,
  CreateCompanyUseCaseProvider,
  GetAllCompaniesUseCaseProvider,
  GetCompanyUseCaseProvider,
  UpdateCompanyUseCaseProvider,
  DeleteCompanyUseCaseProvider,
];
