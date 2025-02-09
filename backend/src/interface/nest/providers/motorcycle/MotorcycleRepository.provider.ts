import { Provider } from "@nestjs/common";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { MotorcycleTypeORMEntity } from "../../../../infrastructure/typeorm/entities/MotorcycleTypeORMEntity";
import { MotorcycleTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/MotorcycleTypeORMRepository";

export const MotorcycleRepositoryProvider: Provider = {
  provide: "MotorcycleRepository",
  useFactory: () => {
    return new MotorcycleTypeORMRepository(
      AppDataSource.getRepository(MotorcycleTypeORMEntity)
    );
  },
};
