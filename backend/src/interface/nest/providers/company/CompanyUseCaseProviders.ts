// src/interface/nest/providers/company/CompanyUseCaseProviders.ts
import { Provider } from "@nestjs/common";
import { CreateCompanyUseCase } from "../../../../application/use-cases/company/CreateCompanyUseCase";
import { CompanyTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/CompanyTypeORMRepository";
import { AppDataSource } from "../../../../infrastructure/db/typeorm.config";
import { CompanyTypeORMEntity } from "../../../../infrastructure/typeorm/entities/CompanyTypeORMEntity";

import { UserTypeORMRepository } from "../../../../infrastructure/typeorm/repositories/UserTypeORMRepository";
import { UserTypeORMEntity } from "../../../../infrastructure/typeorm/entities/UserTypeORMEntity";

export const CompanyUseCaseProviders: Provider[] = [
  {
    provide: CreateCompanyUseCase,
    useFactory: () => {
      const companyRepo = new CompanyTypeORMRepository(
        AppDataSource.getRepository(CompanyTypeORMEntity)
      );
      const userRepo = new UserTypeORMRepository(
        AppDataSource.getRepository(UserTypeORMEntity)
      );

      return new CreateCompanyUseCase(companyRepo, userRepo);
    },
  },
];
