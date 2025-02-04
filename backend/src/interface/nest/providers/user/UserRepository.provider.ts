import { Provider } from "@nestjs/common";
import { UserTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/UserTypeORMRepository";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { UserTypeORMEntity } from "../../../../infrastructure/typeorm/entities/UserTypeORMEntity";

export const UserRepositoryProvider: Provider = {
  provide: "UserRepository",
  useFactory: () => {
    return new UserTypeORMRepository(
      AppDataSource.getRepository(UserTypeORMEntity)
    );
  },
};
