import { Provider } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../application/use-cases/user/CreateUser/CreateUserUseCase";
import { UserRepository } from "../../../../domain/repositories/UserRepository";
import { DriverRepository } from "../../../../domain/repositories/DriverRepository";

export const CreateUserUseCaseProvider: Provider = {
  provide: CreateUserUseCase,
  useFactory: (userRepo: UserRepository, driverRepo: DriverRepository) => {
    return new CreateUserUseCase(userRepo, driverRepo);
  },
  inject: ["UserRepository", "DriverRepository"],
};
