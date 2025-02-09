import { AppDataSource } from "../../infrastructure/db/typeorm.config";

// Repositories
import { UserTypeORMEntity } from "../../infrastructure/typeorm/entities/UserTypeORMEntity";
import { UserTypeORMRepository } from "../../infrastructure/typeorm/repositories/UserTypeORMRepository";

import { DriverTypeORMEntity } from "../../infrastructure/typeorm/entities/DriverTypeORMEntity";
import { DriverTypeORMRepository } from "../../infrastructure/typeorm/repositories/DriverTypeORMRepository";

import { CompanyTypeORMEntity } from "../../infrastructure/typeorm/entities/CompanyTypeORMEntity";
import { CompanyTypeORMRepository } from "../../infrastructure/typeorm/repositories/CompanyTypeORMRepository";

import { ConcessionTypeORMRepository } from "../../infrastructure/typeorm/repositories/ConcessionTypeORMRepository";
import { ConcessionTypeORMEntity } from "../../infrastructure/typeorm/entities/ConcessionTypeORMEntity";

// User Use Cases
import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/user/GetAllUsersUseCase";
import { GetUserUseCase } from "../../application/use-cases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/user/DeleteUserUseCase";

// Company Use Cases
import { CreateCompanyUseCase } from "../../application/use-cases/company/CreateCompanyUseCase";
import { GetAllCompaniesUseCase } from "../../application/use-cases/company/GetAllCompaniesUseCase";
import { GetCompanyUseCase } from "../../application/use-cases/company/GetCompanyUseCase";
import { GetCompanyFromUserUseCase } from "../../application/use-cases/company/GetCompanyFromUserUseCase";
import { UpdateCompanyUseCase } from "../../application/use-cases/company/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "../../application/use-cases/company/DeleteCompanyUseCase";

// Concession Use Cases
import { CreateConcessionUseCase } from "../../application/use-cases/concession/CreateConcessionUseCase";
import { GetAllConcessionsUseCase } from "../../application/use-cases/concession/GetAllConcessionsUseCase";
import { GetConcessionUseCase } from "../../application/use-cases/concession/GetConcessionUseCase";
import { GetConcessionFromUserUseCase } from "../../application/use-cases/concession/GetConcessionFromUserUseCase";
import { UpdateConcessionUseCase } from "../../application/use-cases/concession/UpdateConcessionUseCase";
import { DeleteConcessionUseCase } from "../../application/use-cases/concession/DeleteConcessionUseCase";

// Express App Builder
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
    const concessionRepo = new ConcessionTypeORMRepository(
      AppDataSource.getRepository(ConcessionTypeORMEntity)
    );

    // User Use Cases
    const createUserUseCase = new CreateUserUseCase(
      userRepo,
      driverRepo,
      companyRepo
    );
    const loginUserUseCase = new LoginUserUseCase(userRepo);
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepo);
    const getUserUseCase = new GetUserUseCase(userRepo, driverRepo);
    const updateUserUseCase = new UpdateUserUseCase(
      userRepo,
      driverRepo,
      companyRepo
    );
    const deleteUserUseCase = new DeleteUserUseCase(userRepo);

    // Company Use Cases
    const createCompanyUseCase = new CreateCompanyUseCase(
      companyRepo,
      userRepo
    );
    const getAllCompaniesUseCase = new GetAllCompaniesUseCase(companyRepo);
    const getCompanyUseCase = new GetCompanyUseCase(companyRepo);
    const getCompanyFromUserUseCase = new GetCompanyFromUserUseCase(
      companyRepo,
      userRepo
    );
    const updateCompanyUseCase = new UpdateCompanyUseCase(
      companyRepo,
      userRepo
    );
    const deleteCompanyUseCase = new DeleteCompanyUseCase(companyRepo);

    // Concession Use Cases
    const createConcessionUseCase = new CreateConcessionUseCase(concessionRepo, userRepo);
    const getAllConcessionsUseCase = new GetAllConcessionsUseCase(concessionRepo);
    const getConcessionUseCase = new GetConcessionUseCase(concessionRepo);
    const getConcessionFromUserUseCase = new GetConcessionFromUserUseCase(concessionRepo, userRepo);
    const updateConcessionUseCase = new UpdateConcessionUseCase(concessionRepo, userRepo);
    const deleteConcessionUseCase = new DeleteConcessionUseCase(concessionRepo);

    // Construire l'app Express
    const app = buildApp(
      createUserUseCase,
      loginUserUseCase,
      getAllUsersUseCase,
      getUserUseCase,
      updateUserUseCase,
      deleteUserUseCase,
      createCompanyUseCase,
      getAllCompaniesUseCase,
      getCompanyUseCase,
      getCompanyFromUserUseCase,
      updateCompanyUseCase,
      deleteCompanyUseCase,
      createConcessionUseCase,
      getAllConcessionsUseCase,
      getConcessionUseCase,
      getConcessionFromUserUseCase,
      updateConcessionUseCase,
      deleteConcessionUseCase
    );

    // Lancement du serveur
    app.listen(5000, () => {
      console.log(
        "✅ Express est en cours d'exécution sur http://localhost:5000"
      );
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de TypeORM :", error);
    process.exit(1);
  }
}

startExpress();
