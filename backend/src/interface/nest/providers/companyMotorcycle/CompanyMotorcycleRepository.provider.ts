import { Provider } from "@nestjs/common";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { CompanyMotorcycleTypeORMEntity } from "../../../../infrastructure/typeorm/entities/CompanyMotorcycleTypeORMEntity";
import { CompanyMotorcycleTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/CompanyMotorcycleTypeORMRepository";
import { CompanyMotorcycleRepository } from "../../../../domain/repositories/CompanyMotorcycleRepository";

export const CompanyMotorcycleRepositoryProvider: Provider = {
  provide: "CompanyMotorcycleRepository",
  useFactory: () => {
    const ormRepo = AppDataSource.getRepository(CompanyMotorcycleTypeORMEntity);
    return new CompanyMotorcycleTypeORMRepository(ormRepo);
  },
};

export const CompanyMotorcycleProviders = [CompanyMotorcycleRepositoryProvider];
