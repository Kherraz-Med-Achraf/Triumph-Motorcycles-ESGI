import { Provider } from "@nestjs/common";
import { UpdateUserUseCase } from "../../../../application/use-cases/user/UpdateUserUseCase";
import { UserRepository } from "../../../../domain/repositories/UserRepository";
import { DriverRepository } from "../../../../domain/repositories/DriverRepository";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";

export const UpdateUserUseCaseProvider: Provider = {
  provide: UpdateUserUseCase,
  useFactory: (userRepo: UserRepository, driverRepo: DriverRepository, companyRepo: CompanyRepository) => {
    return new UpdateUserUseCase(userRepo, driverRepo, companyRepo);
  },
  inject: ["UserRepository", "DriverRepository", "CompanyRepository"],
};
