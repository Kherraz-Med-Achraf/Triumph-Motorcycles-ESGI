import { Provider } from "@nestjs/common";
import { CompanyTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/CompanyTypeORMRepository";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { CompanyTypeORMEntity } from "../../../../infrastructure/typeorm/entities/CompanyTypeORMEntity";

export const CompanyRepositoryProvider: Provider = {
  provide: "CompanyRepository", 
  useFactory: () => {
    return new CompanyTypeORMRepository(AppDataSource.getRepository(CompanyTypeORMEntity));
  },
};

export const CompanyProviders = [CompanyRepositoryProvider];
