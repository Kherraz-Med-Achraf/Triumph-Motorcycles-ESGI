import { Provider } from "@nestjs/common";
import { GetAllUsersUseCase } from "../../../../application/use-cases/user/GetAllUsersUseCase";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const GetAllUsersUseCaseProvider: Provider = {
  provide: GetAllUsersUseCase,
  useFactory: (userRepo: UserRepository) => {
    return new GetAllUsersUseCase(userRepo);
  },
  inject: ["UserRepository"],
};
