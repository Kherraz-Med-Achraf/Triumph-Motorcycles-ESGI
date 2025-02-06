import { UserRepositoryProvider, DriverRepositoryProvider  } from "./UserRepository.provider";
import { CreateUserUseCaseProvider } from "./CreateUserUseCase.provider";
import { LoginUserUseCaseProvider } from "./LoginUserUseCase.provider";
import { GetAllUsersUseCaseProvider } from "./GetAllUsersUseCase.provider";

export const UserProviders = [
  UserRepositoryProvider,
  DriverRepositoryProvider,
  CreateUserUseCaseProvider,
  LoginUserUseCaseProvider,
  GetAllUsersUseCaseProvider,
];
