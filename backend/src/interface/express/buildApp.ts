import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { createUserRouter } from "./routes/user.router";
import { createCompanyRouter } from "./routes/company.router";
import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/user/GetAllUsersUseCase";
import { GetUserUseCase } from "../../application/use-cases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/user/DeleteUserUseCase";

import { CreateCompanyUseCase } from "../../application/use-cases/company/CreateCompanyUseCase";
import { GetAllCompaniesUseCase } from "../../application/use-cases/company/GetAllCompaniesUseCase";
import { GetCompanyUseCase } from "../../application/use-cases/company/GetCompanyUseCase";
import { GetCompanyFromUserUseCase } from "../../application/use-cases/company/GetCompanyFromUserUseCase"; // 💡 Import du Use Case
import { UpdateCompanyUseCase } from "../../application/use-cases/company/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "../../application/use-cases/company/DeleteCompanyUseCase";

export function buildApp(
  createUserUseCase: CreateUserUseCase,
  loginUserUseCase: LoginUserUseCase,
  getAllUsersUseCase: GetAllUsersUseCase,
  getUserUseCase: GetUserUseCase,
  updateUserUseCase: UpdateUserUseCase,
  deleteUserUseCase: DeleteUserUseCase,
  createCompanyUseCase: CreateCompanyUseCase,
  getAllCompaniesUseCase: GetAllCompaniesUseCase,
  getCompanyUseCase: GetCompanyUseCase,
  getCompanyFromUserUseCase: GetCompanyFromUserUseCase,
  updateCompanyUseCase: UpdateCompanyUseCase,
  deleteCompanyUseCase: DeleteCompanyUseCase
) {
  const app = express();

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  // Routers
  const userRouter = createUserRouter(
    createUserUseCase,
    loginUserUseCase,
    getAllUsersUseCase,
    getUserUseCase,
    updateUserUseCase,
    deleteUserUseCase
  );
  app.use("/users", userRouter);

  const companyRouter = createCompanyRouter(
    createCompanyUseCase,
    getAllCompaniesUseCase,
    getCompanyUseCase,
    getCompanyFromUserUseCase, 
    updateCompanyUseCase,
    deleteCompanyUseCase
  );
  app.use("/companies", companyRouter);

  return app;
}
