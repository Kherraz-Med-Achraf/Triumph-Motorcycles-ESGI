import { Router, Request, Response } from "express";
import { ZodError } from "zod";

import { CreateMotorcycleUseCase } from "../../../application/use-cases/motorcycle/CreateMotorcycleUseCase";
import { UpdateMotorcycleUseCase } from "../../../application/use-cases/motorcycle/UpdateMotorcycleUseCase";
import { CheckMaintenanceDueUseCase } from "../../../application/use-cases/motorcycle/CheckMaintenanceDueUseCase";
import { PerformMaintenanceUseCase } from "../../../application/use-cases/motorcycle/PerformMaintenanceUseCase";
import { GetAllMotorcyclesUseCase } from "../../../application/use-cases/motorcycle/GetAllMotorcyclesUseCase";
import { FindMotorcyclesByConcessionUseCase } from "../../../application/use-cases/motorcycle/FindMotorcyclesByConcessionUseCase";
import { FindMotorcycleByVinUseCase } from "../../../application/use-cases/motorcycle/FindMotorcycleByVinUseCase";
import { DeleteMotorcycleUseCase } from "../../../application/use-cases/motorcycle/DeleteMotorcycleUseCase";

import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";
import { CheckMaintenanceDTO } from "../../../application/use-cases/motorcycle/CheckMaintenanceDTO";
import { PerformMaintenanceDTO } from "../../../application/use-cases/motorcycle/PerformMaintenanceDTO";

import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";
import { VinAlreadyExistsException } from "../../../domain/exceptions/motorcycle/VinAlreadyExistsException";

export function createMotorcycleRouter(
  createMotorcycleUseCase: CreateMotorcycleUseCase,
  updateMotorcycleUseCase: UpdateMotorcycleUseCase,
  checkMaintenanceDueUseCase: CheckMaintenanceDueUseCase,
  performMaintenanceUseCase: PerformMaintenanceUseCase,
  getAllMotorcyclesUseCase: GetAllMotorcyclesUseCase,
  findMotorcyclesByConcessionUseCase: FindMotorcyclesByConcessionUseCase,
  findMotorcycleByVinUseCase: FindMotorcycleByVinUseCase,
  deleteMotorcycleUseCase: DeleteMotorcycleUseCase
) {
  const router = Router();


  router.post("/", async (req: Request, res: Response) => {
    try {
      const moto = await createMotorcycleUseCase.execute(req.body);
      return res.status(201).json({ message: "Moto créée", moto });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Erreur de validation (create)",
          errors: error.format() 
        });
      }
      if (error instanceof ConcessionNotFoundException) {
        return res.status(400).json({ message: error.message });
      }
      if (error instanceof VinAlreadyExistsException) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.get("/", async (req: Request, res: Response) => {
    try {
      const motos = await getAllMotorcyclesUseCase.execute();
      return res.json(motos);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.get("/concession/:concessionId", async (req: Request, res: Response) => {
    try {
      const concessionId = req.params.concessionId;
      const motos = await findMotorcyclesByConcessionUseCase.execute(concessionId);
      return res.json(motos);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });

  router.get("/vin/:vin", async (req: Request, res: Response) => {
    try {
      const vin = req.params.vin;
      const moto = await findMotorcycleByVinUseCase.execute(vin);
      if (!moto) {
        return res.status(404).json({ message: "Moto introuvable avec ce VIN." });
      }
      return res.json(moto);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const updated = await updateMotorcycleUseCase.execute({ ...req.body, id: req.params.id });
      return res.json({ message: "Moto mise à jour", updated });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Erreur de validation (update)", errors: error.format() });
      }
      if (error instanceof MotorcycleNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });

  // --------------------------
  // GET /motorcycles/:id/check-maintenance => checkMaintenanceDue
  // EX: /motorcycles/123/check-maintenance?currentDate=2025-01-01&currentMileage=12000
  // --------------------------
  router.get("/:id/check-maintenance", async (req: Request, res: Response) => {
    try {
      const dto: CheckMaintenanceDTO = {
        motorcycleId: req.params.id,
        currentMileage: req.query.currentMileage ? Number(req.query.currentMileage) : undefined,
        currentDate: req.query.currentDate ? String(req.query.currentDate) : undefined,
      };
      const result = await checkMaintenanceDueUseCase.execute(dto);
      return res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Erreur de validation (check-maintenance)", 
          errors: error.format() 
        });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.post("/:id/maintenance", async (req: Request, res: Response) => {
    try {
      const dto: PerformMaintenanceDTO = {
        motorcycleId: req.params.id,
        currentMileage: req.body.currentMileage,
        currentDate: req.body.currentDate,
      };
      await performMaintenanceUseCase.execute(dto);
      return res.json({ message: "Maintenance effectuée" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Erreur de validation (performMaintenance)", 
          errors: error.format() 
        });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });


  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      await deleteMotorcycleUseCase.execute(req.params.id);
      return res.json({ message: "Moto supprimée" });
    } catch (error) {
      if (error instanceof MotorcycleNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });

  return router;
}
