import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { CreateCompanyUseCase } from "../../../application/use-cases/company/CreateCompanyUseCase";
import { GetAllCompaniesUseCase } from "../../../application/use-cases/company/GetAllCompaniesUseCase";
import { GetCompanyUseCase } from "../../../application/use-cases/company/GetCompanyUseCase";
import { GetCompanyFromUserUseCase } from "../../../application/use-cases/company/GetCompanyFromUserUseCase";
import { UpdateCompanyUseCase } from "../../../application/use-cases/company/UpdateCompanyUseCase";
import { DeleteCompanyUseCase } from "../../../application/use-cases/company/DeleteCompanyUseCase";

import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

import { CompanyAlreadyExistsException } from "../../../domain/exceptions/company/CompanyAlreadyExistsException";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";
import { CompanyUpdateFailedException } from "../../../domain/exceptions/company/CompanyUpdateFailedException";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";


export function createCompanyRouter(
  createCompanyUseCase: CreateCompanyUseCase,
  getAllCompaniesUseCase: GetAllCompaniesUseCase,
  getCompanyUseCase: GetCompanyUseCase,
  getCompanyFromUserUseCase: GetCompanyFromUserUseCase,
  updateCompanyUseCase: UpdateCompanyUseCase,
  deleteCompanyUseCase: DeleteCompanyUseCase
) {
  const router = Router();

  router.post(
    "/create",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
      try {
        const result = await createCompanyUseCase.execute(req.body);
        return res.status(201).json(result);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({
            message: "Création échouée",
            errors: error.format(),
          });
        }
        if (error instanceof CompanyAlreadyExistsException) {
          return res.status(400).json({ message: error.message });
        }
        if (error instanceof UserNotFoundException) {
          return res.status(404).json({ message: error.message });
        }
        if (error instanceof CompanyNotFoundException) {
          return res.status(404).json({ message: error.message });
        }
        return res
          .status(500)
          .json({ message: "Erreur serveur", details: error });
      }
    }
  );
  router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
      try {
        const companies = await getAllCompaniesUseCase.execute();
        return res.json(companies);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Erreur serveur", details: error });
      }
    }
  );

  router.get(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
      try {
        const company = await getCompanyUseCase.execute(req.params.id);
        return res.json(company);
      } catch (error) {
        if (error instanceof CompanyNotFoundException) {
          return res.status(404).json({ message: error.message });
        }
        return res
          .status(500)
          .json({ message: "Erreur serveur", details: error });
      }
    }
  );
  // GET /companies/user/:userId
  router.get(
    "/user/:userId",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
      try {
        const company = await getCompanyFromUserUseCase.execute(
          req.params.userId
        );
        return res.json(company);
      } catch (error) {
        if (error instanceof UserNotFoundException) {
          return res.status(404).json({ message: error.message });
        }
        if (error instanceof CompanyNotFoundException) {
          return res
            .status(404)
            .json({
              message:
                "L'entreprise associée à cet utilisateur n'a pas été trouvée.",
            });
        }
        return res
          .status(500)
          .json({ message: "Erreur serveur", details: error });
      }
    }
  );

  router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
      try {
        const updatedCompany = await updateCompanyUseCase.execute(
          req.params.id,
          req.body
        );
        return res.json(updatedCompany);
      } catch (error) {
        if (error instanceof CompanyNotFoundException) {
          return res.status(404).json({ message: error.message });
        }
        if (error instanceof ZodError) {
          return res
            .status(400)
            .json({ message: "Validation échouée", errors: error.format() });
        }
        if (error instanceof CompanyUpdateFailedException) {
          return res.status(400).json({ message: error.message });
        }
        return res
          .status(500)
          .json({ message: "Erreur serveur", details: error });
      }
    }
  );

  router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req: Request, res: Response) => {
      try {
        await deleteCompanyUseCase.execute(req.params.id);
        return res.json({ message: "Société supprimée avec succès." });
      } catch (error) {
        if (error instanceof CompanyNotFoundException) {
          return res.status(404).json({ message: error.message });
        }
        return res
          .status(500)
          .json({ message: "Erreur serveur", details: error });
      }
    }
  );

  return router;
}
