import { Provider } from "@nestjs/common";
import { DeleteUserUseCase } from "../../../../application/use-cases/user/DeleteUserUseCase";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const DeleteUserUseCaseProvider: Provider = {
  provide: DeleteUserUseCase,
  useFactory: (userRepo: UserRepository) => {
    return new DeleteUserUseCase(userRepo);
  },
  inject: ["UserRepository"],
};
