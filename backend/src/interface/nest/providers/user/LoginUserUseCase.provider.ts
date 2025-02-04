import { Provider } from "@nestjs/common";
import { LoginUserUseCase } from "../../../../application/use-cases/user/LoginUserUseCase";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const LoginUserUseCaseProvider: Provider = {
  provide: LoginUserUseCase,
  useFactory: (userRepo: UserRepository) => {
    return new LoginUserUseCase(userRepo);
  },
  inject: ["UserRepository"],
};
