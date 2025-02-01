// src/interface/express/main-express.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { AppDataSource } from "../../infrastructure/db/typeorm.config";
import { UserTypeORMEntity } from "../../infrastructure/typeorm/entities/UserTypeORMEntity";
import { UserTypeORMRepository } from "../../infrastructure/typeorm/repositories/UserTypeORMRepository";
import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";

import { createUserRouter } from "./routes/user.router";

async function startExpress() {
  try {
    console.log("🚀 Initialisation de la base de données...");
    await AppDataSource.initialize();
    console.log("✅ Base de données connectée !");

    // On instancie le repo + use cases
    const userOrmRepo = new UserTypeORMRepository(
      AppDataSource.getRepository(UserTypeORMEntity)
    );
    const createUserUseCase = new CreateUserUseCase(userOrmRepo);
    const loginUserUseCase = new LoginUserUseCase(userOrmRepo);

    // Création de l'app Express
    const app = express();

    // Middlewares
    app.use(bodyParser.json());
    app.use(
      cors({
        origin: "http://localhost:5173", // ton front
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
      })
    );

    // On monte le router "users"
    const userRouter = createUserRouter(createUserUseCase, loginUserUseCase);
    app.use("/users", userRouter);

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
