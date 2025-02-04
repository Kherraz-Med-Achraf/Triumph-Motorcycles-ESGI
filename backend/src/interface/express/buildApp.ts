import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { createUserRouter } from "./routes/user.router";
import { createCompanyRouter } from "./routes/company.router";
import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/user/GetAllUsersUseCase";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";
import { CreateCompanyUseCase } from "../../application/use-cases/company/CreateCompanyUseCase";

//Construit l'app Express en recevant les use cases déjà instanciés.

export function buildApp(
  createUserUseCase: CreateUserUseCase,
  loginUserUseCase: LoginUserUseCase,
  createCompanyUseCase: CreateCompanyUseCase,
  getAllUsersUseCase: GetAllUsersUseCase
) {
  const app = express();

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "http://localhost:5173", // ton front
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  // Routers
  const userRouter = createUserRouter(
    createUserUseCase,
    loginUserUseCase,
    getAllUsersUseCase
  );
  app.use("/users", userRouter);

  const companyRouter = createCompanyRouter(createCompanyUseCase);
  app.use("/companies", companyRouter);

  return app;
}
