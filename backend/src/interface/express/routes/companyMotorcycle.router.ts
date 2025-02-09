import { Router, Request, Response } from "express";
import { CreateCompanyMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/CreateCompanyMotorcycleUseCase";
import { GetCompanyMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/GetCompanyMotorcycleUseCase";
import { GetAllCompanyMotorcyclesUseCase } from "../../../application/use-cases/companyMotorcycle/GetAllCompanyMotorcyclesUseCase";
import { GetCompanyMotorcyclesByCompanyUseCase } from "../../../application/use-cases/companyMotorcycle/GetCompanyMotorcyclesByCompanyUseCase";
import { GetCompanyMotorcyclesByMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/GetCompanyMotorcyclesByMotorcycleUseCase";
import { UpdateCompanyMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/UpdateCompanyMotorcycleUseCase";
import { DeleteCompanyMotorcycleUseCase } from "../../../application/use-cases/companyMotorcycle/DeleteCompanyMotorcycleUseCase";

import { CreateCompanyMotorcycleDTO } from "../../../application/use-cases/companyMotorcycle/CreateCompanyMotorcycleDTO";
import { UpdateCompanyMotorcycleDTO } from "../../../application/use-cases/companyMotorcycle/UpdateCompanyMotorcycleDTO";


export function createCompanyMotorcycleRouter(
  createCompanyMotorcycleUC: CreateCompanyMotorcycleUseCase,
  getCompanyMotorcycleUC: GetCompanyMotorcycleUseCase,
  getAllCompanyMotorcyclesUC: GetAllCompanyMotorcyclesUseCase,
  getCompanyMotorcyclesByCompanyUC: GetCompanyMotorcyclesByCompanyUseCase,
  getCompanyMotorcyclesByMotorcycleUC: GetCompanyMotorcyclesByMotorcycleUseCase,
  updateCompanyMotorcycleUC: UpdateCompanyMotorcycleUseCase,
  deleteCompanyMotorcycleUC: DeleteCompanyMotorcycleUseCase
) {
  const router = Router();

  // CREATE
  router.post("/", async (req: Request, res: Response) => {
    try {
      const dto = req.body as CreateCompanyMotorcycleDTO;
      const createdLink = await createCompanyMotorcycleUC.execute(dto);
      return res.status(201).json({ message: "Lien créé", link: createdLink });
    } catch (error) {
      return res.status(400).json({ message: "Erreur lors de la création", error });
    }
  });

  // GET ALL
  router.get("/", async (req: Request, res: Response) => {
    try {
      const links = await getAllCompanyMotorcyclesUC.execute();
      return res.json(links);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  });

  // GET BY ID
  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const linkId = req.params.id;
      const link = await getCompanyMotorcycleUC.execute(linkId);
      if (!link) {
        return res.status(404).json({ message: "Lien introuvable" });
      }
      return res.json(link);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  });

  // GET BY COMPANY
  router.get("/company/:companyId", async (req: Request, res: Response) => {
    try {
      const { companyId } = req.params;
      const links = await getCompanyMotorcyclesByCompanyUC.execute(companyId);
      return res.json(links);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  });

  // GET BY MOTORCYCLE
  router.get("/motorcycle/:motoId", async (req: Request, res: Response) => {
    try {
      const { motoId } = req.params;
      const links = await getCompanyMotorcyclesByMotorcycleUC.execute(motoId);
      return res.json(links);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  });

  // UPDATE
  router.put("/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      // On peut merger l'id dans le body
      const updateDto: UpdateCompanyMotorcycleDTO = { ...req.body, id };
      const updatedLink = await updateCompanyMotorcycleUC.execute(updateDto);

      if (!updatedLink) {
        return res.status(404).json({ message: "Lien introuvable" });
      }

      return res.json({ message: "Lien mis à jour", link: updatedLink });
    } catch (error) {
      return res.status(400).json({ message: "Erreur lors de la mise à jour", error });
    }
  });

  // DELETE
  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await deleteCompanyMotorcycleUC.execute(id);
      return res.json({ message: "Lien supprimé" });
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur", error });
    }
  });

  return router;
}
