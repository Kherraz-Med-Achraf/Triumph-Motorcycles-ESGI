import { ConcessionRepositoryProvider } from "./ConcessionRepository.provider";
import { CreateConcessionUseCaseProvider } from "./CreateConcessionUseCase.provider";
import { GetAllConcessionsUseCaseProvider } from "./GetAllConcessionsUseCase.provider";
import { GetConcessionUseCaseProvider } from "./GetConcessionUseCase.provider";
import { GetConcessionFromUserUseCaseProvider } from "./GetConcessionFromUserProvider";
import { UpdateConcessionUseCaseProvider } from "./UpdateConcessionUseCase.provider";
import { DeleteConcessionUseCaseProvider } from "./DeleteConcessionUseCase.provider";

export const ConcessionProviders = [
  ConcessionRepositoryProvider,
  CreateConcessionUseCaseProvider,
  GetAllConcessionsUseCaseProvider,
  GetConcessionFromUserUseCaseProvider,
  GetConcessionUseCaseProvider,
  UpdateConcessionUseCaseProvider,
  DeleteConcessionUseCaseProvider,
];
