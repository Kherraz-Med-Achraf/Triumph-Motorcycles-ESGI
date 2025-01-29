import { Provider } from "@nestjs/common";
import { RegisterUserUseCase } from "../../../../application/use-cases/user/RegisterUserUseCase";
import { UserTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/UserTypeORMRepository";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { UserTypeORMEntity } from "../../../../infrastructure/typeorm/entities/UserTypeORMEntity";

export const UserUseCaseProviders: Provider[] = [
  {
    provide: RegisterUserUseCase,
    useFactory: () => {
      const userRepo = new UserTypeORMRepository(
        AppDataSource.getRepository(UserTypeORMEntity)
      );
      return new RegisterUserUseCase(userRepo);
    },
  },
];
