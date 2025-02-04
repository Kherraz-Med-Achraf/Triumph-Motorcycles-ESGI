// src/interface/express/routes/company.router.ts
import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { CreateCompanyUseCase } from "../../../application/use-cases/company/CreateCompanyUseCase";
import { ManagerUserNotFoundException } from "../../../domain/exceptions/ManagerUserNotFoundException";

export function createCompanyRouter(createCompanyUseCase: CreateCompanyUseCase) {
  const router = Router();

  // POST /companies
  router.post("/", async (req: Request, res: Response) => {
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
      if (error instanceof ManagerUserNotFoundException) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });

  return router;
}
