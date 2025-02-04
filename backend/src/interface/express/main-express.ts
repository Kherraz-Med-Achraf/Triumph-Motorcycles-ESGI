// src/interface/express/main-express.ts
import { AppDataSource } from "../../infrastructure/db/typeorm.config";
import { UserTypeORMEntity } from "../../infrastructure/typeorm/entities/UserTypeORMEntity";
import { UserTypeORMRepository } from "../../infrastructure/typeorm/repositories/UserTypeORMRepository";

import { CompanyTypeORMEntity } from "../../infrastructure/typeorm/entities/CompanyTypeORMEntity";
import { CompanyTypeORMRepository } from "../../infrastructure/typeorm/repositories/CompanyTypeORMRepository";

import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";
import { CreateCompanyUseCase } from "../../application/use-cases/company/CreateCompanyUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/user/GetAllUsersUseCase";

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
    const companyRepo = new CompanyTypeORMRepository(
      AppDataSource.getRepository(CompanyTypeORMEntity)
    );
    

    // Instancier les use cases
    const createUserUseCase = new CreateUserUseCase(userRepo);
    const loginUserUseCase = new LoginUserUseCase(userRepo);
    const createCompanyUseCase = new CreateCompanyUseCase(companyRepo, userRepo);
    const getAllUserUseCase = new GetAllUsersUseCase(userRepo);
    // Construire l'app Express
    const app = buildApp(
      createUserUseCase,
      loginUserUseCase,
      createCompanyUseCase,
      getAllUserUseCase
    );

    // Lancement
    app.listen(5000, () => {
      console.log(`✅ Express est en cours d'exécution sur http://localhost:5000`);
    });

  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation de TypeORM :", error);
    process.exit(1);
  }
}

startExpress();
