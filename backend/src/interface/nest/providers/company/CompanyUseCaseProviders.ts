import { Provider } from "@nestjs/common";
import { CreateCompanyUseCase } from "../../../../application/use-cases/company/CreateCompanyUseCase";
import {
  UserTypeORMRepository,
  CompanyTypeORMRepository,
} from "../../../../infrastructure/typeorm/repositories/index";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import {
  UserTypeORMEntity,
  CompanyTypeORMEntity,
} from "../../../../infrastructure/typeorm/entities/index";

export const CompanyUseCaseProviders: Provider[] = [
  {
    provide: CreateCompanyUseCase,
    useFactory: () => {
      const userRepo = new UserTypeORMRepository(
        AppDataSource.getRepository(UserTypeORMEntity)
      );
      const companyRepo = new CompanyTypeORMRepository(
        AppDataSource.getRepository(CompanyTypeORMEntity)
      );
      return new CreateCompanyUseCase(companyRepo, userRepo);
    },
  },
];
