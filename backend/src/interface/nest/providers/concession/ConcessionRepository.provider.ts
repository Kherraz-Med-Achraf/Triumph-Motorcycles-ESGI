import { Provider } from "@nestjs/common";
import { ConcessionTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/ConcessionTypeORMRepository";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { ConcessionTypeORMEntity } from "../../../../infrastructure/typeorm/entities/ConcessionTypeORMEntity";

export const ConcessionRepositoryProvider: Provider = {
  provide: "ConcessionRepository",
  useFactory: () => {
    return new ConcessionTypeORMRepository(
      AppDataSource.getRepository(ConcessionTypeORMEntity)
    );
  },
};
