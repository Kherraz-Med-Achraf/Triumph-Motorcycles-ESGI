import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { createUserRouter } from "./routes/user.router";
import { createCompanyRouter } from "./routes/company.router";
import { createConcessionRouter } from "./routes/concession.router";
import { createMotorcycleRouter } from "./routes/motorcycle.router";
import { createCompanyMotorcycleRouter } from "./routes/companyMotorcycle.router";


import { CreateUserUseCase } from "../../application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/user/LoginUserUseCase";
import { GetAllUsersUseCase } from "../../application/use-cases/user/GetAllUsersUseCase";
import { GetUserUseCase } from "../../application/use-cases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/user/DeleteUserUseCase";

import { CreateCompanyUseCase } from "../../application/use-cases/company/CreateCompanyUseCase";
import { GetAllCompaniesUseCase } from "../../application/use-cases/company/GetAllCompaniesUseCase";
import { GetCompanyUseCase } from "../../application/use-cases/company/GetCompanyUseCase";
import { GetCompanyFromUserUseCase } from "../../application/use-cases/company/GetCompanyFromUserUseCase"; 
import { UpdateCompanyUseCase } from "../../application/use-cases/company/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "../../application/use-cases/company/DeleteCompanyUseCase";


import { CreateConcessionUseCase } from "../../application/use-cases/concession/CreateConcessionUseCase";
import { GetAllConcessionsUseCase } from "../../application/use-cases/concession/GetAllConcessionsUseCase";
import { GetConcessionUseCase } from "../../application/use-cases/concession/GetConcessionUseCase";
import { GetConcessionFromUserUseCase } from "../../application/use-cases/concession/GetConcessionFromUserUseCase";
import { UpdateConcessionUseCase } from "../../application/use-cases/concession/UpdateConcessionUseCase";
import { DeleteConcessionUseCase } from "../../application/use-cases/concession/DeleteConcessionUseCase";

import { CreateMotorcycleUseCase } from "../../application/use-cases/motorcycle/CreateMotorcycleUseCase";
import { UpdateMotorcycleUseCase } from "../../application/use-cases/motorcycle/UpdateMotorcycleUseCase";
import { CheckMaintenanceDueUseCase } from "../../application/use-cases/motorcycle/CheckMaintenanceDueUseCase";
import { PerformMaintenanceUseCase } from "../../application/use-cases/motorcycle/PerformMaintenanceUseCase";
import { GetAllMotorcyclesUseCase } from "../../application/use-cases/motorcycle/GetAllMotorcyclesUseCase";
import { FindMotorcyclesByConcessionUseCase } from "../../application/use-cases/motorcycle/FindMotorcyclesByConcessionUseCase";
import { FindMotorcycleByVinUseCase } from "../../application/use-cases/motorcycle/FindMotorcycleByVinUseCase";
import { DeleteMotorcycleUseCase } from "../../application/use-cases/motorcycle/DeleteMotorcycleUseCase";

import { CreateCompanyMotorcycleUseCase } from "../../application/use-cases/companyMotorcycle/CreateCompanyMotorcycleUseCase";
import { GetCompanyMotorcycleUseCase } from "../../application/use-cases/companyMotorcycle/GetCompanyMotorcycleUseCase";
import { GetAllCompanyMotorcyclesUseCase } from "../../application/use-cases/companyMotorcycle/GetAllCompanyMotorcyclesUseCase";
import { GetCompanyMotorcyclesByCompanyUseCase } from "../../application/use-cases/companyMotorcycle/GetCompanyMotorcyclesByCompanyUseCase";
import { GetCompanyMotorcyclesByMotorcycleUseCase } from "../../application/use-cases/companyMotorcycle/GetCompanyMotorcyclesByMotorcycleUseCase";
import { UpdateCompanyMotorcycleUseCase } from "../../application/use-cases/companyMotorcycle/UpdateCompanyMotorcycleUseCase";
import { DeleteCompanyMotorcycleUseCase } from "../../application/use-cases/companyMotorcycle/DeleteCompanyMotorcycleUseCase";



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
  deleteCompanyUseCase: DeleteCompanyUseCase,
  createConcessionUseCase: CreateConcessionUseCase,
  getAllConcessionsUseCase: GetAllConcessionsUseCase,
  getConcessionUseCase: GetConcessionUseCase,
  getConcessionFromUserUseCase: GetConcessionFromUserUseCase,
  updateConcessionUseCase: UpdateConcessionUseCase,
  deleteConcessionUseCase: DeleteConcessionUseCase,
  createMotorcycleUseCase: CreateMotorcycleUseCase,
  updateMotorcycleUseCase: UpdateMotorcycleUseCase,
  checkMaintenanceDueUseCase: CheckMaintenanceDueUseCase,
  performMaintenanceUseCase: PerformMaintenanceUseCase,
  getAllMotorcyclesUseCase: GetAllMotorcyclesUseCase,
  findMotorcyclesByConcessionUseCase: FindMotorcyclesByConcessionUseCase,
  findMotorcycleByVinUseCase: FindMotorcycleByVinUseCase,
  deleteMotorcycleUseCase: DeleteMotorcycleUseCase,
  createCompanyMotorcycleUC: CreateCompanyMotorcycleUseCase,
  getCompanyMotorcycleUC: GetCompanyMotorcycleUseCase,
  getAllCompanyMotorcyclesUC: GetAllCompanyMotorcyclesUseCase,
  getCompanyMotorcyclesByCompanyUC: GetCompanyMotorcyclesByCompanyUseCase,
  getCompanyMotorcyclesByMotorcycleUC: GetCompanyMotorcyclesByMotorcycleUseCase,
  updateCompanyMotorcycleUC: UpdateCompanyMotorcycleUseCase,
  deleteCompanyMotorcycleUC: DeleteCompanyMotorcycleUseCase,
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

  const concessionRouter = createConcessionRouter(
    createConcessionUseCase,
    getAllConcessionsUseCase,
    getConcessionUseCase,
    getConcessionFromUserUseCase,
    updateConcessionUseCase,
    deleteConcessionUseCase
  );
  app.use("/concessions", concessionRouter);

    const motorcycleRouter = createMotorcycleRouter(
      createMotorcycleUseCase,
      updateMotorcycleUseCase,
      checkMaintenanceDueUseCase,
      performMaintenanceUseCase,
      getAllMotorcyclesUseCase,
      findMotorcyclesByConcessionUseCase,
      findMotorcycleByVinUseCase,
      deleteMotorcycleUseCase
    );
    app.use("/motorcycles", motorcycleRouter);

    const companyMotorcycleRouter = createCompanyMotorcycleRouter(
      createCompanyMotorcycleUC,
      getCompanyMotorcycleUC,
      getAllCompanyMotorcyclesUC,
      getCompanyMotorcyclesByCompanyUC,
      getCompanyMotorcyclesByMotorcycleUC,
      updateCompanyMotorcycleUC,
      deleteCompanyMotorcycleUC
    );
    app.use("/company-motorcycles", companyMotorcycleRouter);

  return app;
}
