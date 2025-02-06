import { AppDataSource } from "../../infrastructure/db/typeorm.config";
import { UserTypeORMEntity } from "../../infrastructure/typeorm/entities/UserTypeORMEntity";
import { UserTypeORMRepository } from "../../infrastructure/typeorm/repositories/UserTypeORMRepository";

import { DriverTypeORMEntity } from "../../infrastructure/typeorm/entities/DriverTypeORMEntity";
import { DriverTypeORMRepository } from "../../infrastructure/typeorm/repositories/DriverTypeORMRepository";

import { CompanyTypeORMEntity } from "../../infrastructure/typeorm/entities/CompanyTypeORMEntity";
import { CompanyTypeORMRepository } from "../../infrastructure/typeorm/repositories/CompanyTypeORMRepository";

import { CreateUserUseCase } from "../../application/use-cases/user/CreateUser/CreateUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/user/GetAllUsersUseCase";

import { CreateCompanyUseCase } from "../../application/use-cases/company/CreateCompanyUseCase";
import { GetAllCompaniesUseCase } from "../../application/use-cases/company/GetAllCompaniesUseCase";
import { GetCompanyUseCase } from "../../application/use-cases/company/GetCompanyUseCase";
import { UpdateCompanyUseCase } from "../../application/use-cases/company/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "../../application/use-cases/company/DeleteCompanyUseCase";

import { buildApp } from "./buildApp";

async function startExpress() {
  try {
    console.log("🚀 Initialisation de la base de données...");
    await AppDataSource.initialize();
    console.log("✅ Base de données connectée !");

    // Instancier les repositories
    const userRepo = new UserTypeORMRepository(
      AppDataSource.getRepository(UserTypeORMEntity)
    );
    const driverRepo = new DriverTypeORMRepository(
      AppDataSource.getRepository(DriverTypeORMEntity)
    );
    const companyRepo = new CompanyTypeORMRepository(
      AppDataSource.getRepository(CompanyTypeORMEntity)
    );

    // Instancier les use cases

    //user
    const createUserUseCase = new CreateUserUseCase(userRepo, driverRepo);
    const loginUserUseCase = new LoginUserUseCase(userRepo);
    const getAllUserUseCase = new GetAllUsersUseCase(userRepo);
    //company
    const createCompanyUseCase = new CreateCompanyUseCase(companyRepo);
    const getAllCompaniesUseCase = new GetAllCompaniesUseCase(companyRepo);
    const getCompanyUseCase = new GetCompanyUseCase(companyRepo);
    const updateCompanyUseCase = new UpdateCompanyUseCase(companyRepo);
    const deleteCompanyUseCase = new DeleteCompanyUseCase(companyRepo);

    // Construire l'app Express
    const app = buildApp(
      createUserUseCase,
      loginUserUseCase,
      getAllUserUseCase,
      createCompanyUseCase,
      getAllCompaniesUseCase,
      getCompanyUseCase,
      updateCompanyUseCase,
      deleteCompanyUseCase
    );

    // Lancement
    app.listen(5000, () => {
      console.log(
        `✅ Express est en cours d'exécution sur http://localhost:5000`
      );
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de TypeORM :", error);
    process.exit(1);
  }
}

startExpress();
