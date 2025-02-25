import { Provider } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../application/use-cases/user/CreateUserUseCase";
import { UserRepository } from "../../../../domain/repositories/UserRepository";
import { DriverRepository } from "../../../../domain/repositories/DriverRepository";
import { CompanyRepository } from "../../../../domain/repositories/CompanyRepository";

export const CreateUserUseCaseProvider: Provider = {
  provide: CreateUserUseCase,
  useFactory: (userRepo: UserRepository, driverRepo: DriverRepository, companyRepo: CompanyRepository) => {
    return new CreateUserUseCase(userRepo, driverRepo, companyRepo);
  },
  inject: ["UserRepository", "DriverRepository", "CompanyRepository"],
};
