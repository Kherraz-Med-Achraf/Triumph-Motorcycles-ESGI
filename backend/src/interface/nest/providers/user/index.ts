import { UserRepositoryProvider } from "./UserRepository.provider";
import { CreateUserUseCaseProvider } from "./CreateUserUseCase.provider";
import { LoginUserUseCaseProvider } from "./LoginUserUseCase.provider";
import { GetAllUsersUseCaseProvider } from "./GetAllUsersUseCase.provider";

export const UserProviders = [
  UserRepositoryProvider,
  CreateUserUseCaseProvider,
  LoginUserUseCaseProvider,
  GetAllUsersUseCaseProvider,
];
