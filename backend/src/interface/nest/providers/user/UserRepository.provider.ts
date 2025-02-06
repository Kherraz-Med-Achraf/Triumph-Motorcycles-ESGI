import { Provider } from "@nestjs/common";
import { UserTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/UserTypeORMRepository";
import { DriverTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/DriverTypeORMRepository";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { UserTypeORMEntity } from "../../../../infrastructure/typeorm/entities/UserTypeORMEntity";
import { DriverTypeORMEntity } from "../../../../infrastructure/typeorm/entities/DriverTypeORMEntity";

export const UserRepositoryProvider: Provider = {
  provide: "UserRepository",
  useFactory: () => {
    return new UserTypeORMRepository(
      AppDataSource.getRepository(UserTypeORMEntity)
    );
  },
};

export const DriverRepositoryProvider: Provider = {
  provide: "DriverRepository",
  useFactory: () => {
    return new DriverTypeORMRepository(
      AppDataSource.getRepository(DriverTypeORMEntity)
    );
  },
};

export const UserProviders: Provider[] = [
  UserRepositoryProvider,
  DriverRepositoryProvider,
];
