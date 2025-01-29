import { Provider } from "@nestjs/common";
import { CreateConcessionUseCase } from "../../../../application/use-cases/concession/CreateConcessionUseCase";
import {
  UserTypeORMRepository,
  ConcessionTypeORMRepository,
} from "../../../../infrastructure/typeorm/repositories/index";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import {
  UserTypeORMEntity,
  ConcessionTypeORMEntity,
} from "../../../../infrastructure/typeorm/entities/index";

export const ConcessionUseCaseProviders: Provider[] = [
  {
    provide: CreateConcessionUseCase,
    useFactory: () => {
      const userRepo = new UserTypeORMRepository(
        AppDataSource.getRepository(UserTypeORMEntity)
      );
      const concessionRepo = new ConcessionTypeORMRepository(
        AppDataSource.getRepository(ConcessionTypeORMEntity)
      );
      return new CreateConcessionUseCase(concessionRepo, userRepo);
    },
  },
];
