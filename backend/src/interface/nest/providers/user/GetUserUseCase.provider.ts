import { Provider } from "@nestjs/common";
import { GetUserUseCase } from "../../../../application/use-cases/user/GetUserUseCase";
import { UserRepository } from "../../../../domain/repositories/UserRepository";
import { DriverRepository } from "../../../../domain/repositories/DriverRepository";

export const GetUserUseCaseProvider: Provider = {
  provide: GetUserUseCase,
  useFactory: (userRepo: UserRepository, driverRepo: DriverRepository) => {
    return new GetUserUseCase(userRepo, driverRepo);
  },
  inject: ["UserRepository", "DriverRepository"],
};
