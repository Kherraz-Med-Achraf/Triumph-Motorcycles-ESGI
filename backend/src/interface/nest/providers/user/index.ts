import { UserRepositoryProvider, DriverRepositoryProvider  } from "./UserRepository.provider";
import { CreateUserUseCaseProvider } from "./CreateUserUseCase.provider";
import { LoginUserUseCaseProvider } from "./LoginUserUseCase.provider";
import { GetAllUsersUseCaseProvider } from "./GetAllUsersUseCase.provider";
import { GetUserUseCaseProvider } from "./GetUserUseCase.provider";
import { UpdateUserUseCaseProvider } from "./UpdateUserUseCase.provider";
import { DeleteUserUseCaseProvider } from "./DeleteUserUseCase.provider";

export const UserProviders = [
  UserRepositoryProvider,
  DriverRepositoryProvider,
  CreateUserUseCaseProvider,
  LoginUserUseCaseProvider,
  GetAllUsersUseCaseProvider,
  GetUserUseCaseProvider,
  UpdateUserUseCaseProvider,
  DeleteUserUseCaseProvider,
];
