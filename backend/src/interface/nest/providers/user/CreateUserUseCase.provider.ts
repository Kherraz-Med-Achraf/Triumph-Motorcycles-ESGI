import { Provider } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../application/use-cases/user/CreateUserUseCase";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const CreateUserUseCaseProvider: Provider = {
  provide: CreateUserUseCase,
  useFactory: (userRepo: UserRepository) => {
    return new CreateUserUseCase(userRepo);
  },
  inject: ["UserRepository"],
};
