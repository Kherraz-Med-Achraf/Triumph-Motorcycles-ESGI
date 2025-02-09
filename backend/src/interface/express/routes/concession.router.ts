import { Router, Request, Response } from "express";
import { ZodError } from "zod";

import { CreateConcessionUseCase } from "../../../application/use-cases/concession/CreateConcessionUseCase";
import { GetAllConcessionsUseCase } from "../../../application/use-cases/concession/GetAllConcessionsUseCase";
import { GetConcessionUseCase } from "../../../application/use-cases/concession/GetConcessionUseCase";
import { GetConcessionFromUserUseCase } from "../../../application/use-cases/concession/GetConcessionFromUserUseCase";
import { UpdateConcessionUseCase } from "../../../application/use-cases/concession/UpdateConcessionUseCase";
import { DeleteConcessionUseCase } from "../../../application/use-cases/concession/DeleteConcessionUseCase";

import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";

export function createConcessionRouter(
  createConcessionUseCase: CreateConcessionUseCase,
  getAllConcessionsUseCase: GetAllConcessionsUseCase,
  getConcessionUseCase: GetConcessionUseCase,
  getConcessionFromUserUseCase: GetConcessionFromUserUseCase,
  updateConcessionUseCase: UpdateConcessionUseCase,
  deleteConcessionUseCase: DeleteConcessionUseCase
) {
  const router = Router();

  router.post("/create", async (req: Request, res: Response) => {
    try {
      const concession = await createConcessionUseCase.execute(req.body);
      return res.status(201).json({ message: "Concession created", concession });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Création échouée (validation Zod)",
          errors: error.format(),
        });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.get("/", async (req: Request, res: Response) => {
    try {
      const concessions = await getAllConcessionsUseCase.execute();
      return res.json(concessions);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const concession = await getConcessionUseCase.execute(req.params.id);
      return res.json(concession);
    } catch (error) {
      if (error instanceof ConcessionNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.get("/user/:userId", async (req: Request, res: Response) => {
    try {
      const concessions = await getConcessionFromUserUseCase.execute(
        req.params.userId
      );
      return res.json(concessions);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const dto = { ...req.body, id: req.params.id };
      const updated = await updateConcessionUseCase.execute(dto);
      return res.json({ message: "Concession updated", updated });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation échouée",
          errors: error.format(),
        });
      }
      if (error instanceof ConcessionNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      await deleteConcessionUseCase.execute(req.params.id);
      return res.json({ message: "Concession deleted" });
    } catch (error) {
      if (error instanceof ConcessionNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });

  return router;
}
