import { Provider } from "@nestjs/common";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { IntervalTypeORMEntity } from "../../../../infrastructure/typeorm/entities/IntervalTypeORMEntity";
import { IntervalTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/IntervalTypeORMRepository";

export const IntervalRepositoryProvider: Provider = {
  provide: "IntervalRepository",
  useFactory: () => {
    return new IntervalTypeORMRepository(
      AppDataSource.getRepository(IntervalTypeORMEntity)
    );
  },
};
