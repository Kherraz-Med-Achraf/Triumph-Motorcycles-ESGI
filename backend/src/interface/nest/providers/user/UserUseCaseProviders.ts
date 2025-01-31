import { Provider } from "@nestjs/common";
import { CreateUserUseCase } from "../../../../application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../../../../application/use-cases/user/LoginUserUseCase";
import { UserTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/UserTypeORMRepository";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { UserTypeORMEntity } from "../../../../infrastructure/typeorm/entities/UserTypeORMEntity";

export const UserUseCaseProviders: Provider[] = [
  {
    provide: CreateUserUseCase,
    useFactory: () => {
      const userRepo = new UserTypeORMRepository(
        AppDataSource.getRepository(UserTypeORMEntity)
      );
      return new CreateUserUseCase(userRepo);
    },
  },
  {
    provide: LoginUserUseCase,
    useFactory: () => {
      const userRepo = new UserTypeORMRepository(
        AppDataSource.getRepository(UserTypeORMEntity)
      );
      return new LoginUserUseCase(userRepo);
    },
  },
];
