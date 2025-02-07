import { Router, Request, Response } from "express";
import { ZodError } from "zod";

import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../../../application/use-cases/user/LoginUserUseCase";
import { GetAllUsersUseCase } from "../../../application/use-cases/user/GetAllUsersUseCase";
import { GetUserUseCase } from "../../../application/use-cases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../application/use-cases/user/DeleteUserUseCase";

import { EmailAlreadyExistsException } from "../../../domain/exceptions/EmailAlreadyExistsException";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { DriverNotFoundException } from "../../../domain/exceptions/user/DriverNotFoundException";
import { AuthService } from "../../../infrastructure/auth/AuthService";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";

export function createUserRouter(
  createUserUseCase: CreateUserUseCase,
  loginUserUseCase: LoginUserUseCase,
  getAllUsersUseCase: GetAllUsersUseCase,
  getUserUseCase: GetUserUseCase,
  updateUserUseCase: UpdateUserUseCase,
  deleteUserUseCase: DeleteUserUseCase
) {
  const router = Router();

  // POST /users/register
  router.post("/register", async (req: Request, res: Response) => {
    try {
      const result = await createUserUseCase.execute(req.body);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Inscription échouée",
          errors: error.format(),
        });
      }
      if (error instanceof EmailAlreadyExistsException) {
        return res.status(400).json({ message: error.message });
      }
      return res
        .status(500)
        .json({ message: "Erreur serveur", details: error });
    }
  });

  // POST /users/login
  router.post("/login", async (req: Request, res: Response) => {
    try {
      const user = await loginUserUseCase.execute(req.body);
      const token = AuthService.generateToken(user);
      return res.json({ message: "Connexion réussie", token });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation échouée",
          errors: JSON.parse(error.message),
        });
      }
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }
  });

  // GET /users/me (protégé par authMiddleware)
  router.get("/me", authMiddleware, (req: Request, res: Response) => {
    const user = (req as any).user;
    return res.json({ message: "Profil utilisateur", user });
  });

  // GET /users/all (protégé par authMiddleware)
  router.get("/all", authMiddleware, async (req: Request, res: Response) => {
    try {
      const users = await getAllUsersUseCase.execute();
      return res.json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erreur serveur", details: error });
    }
  });

  // GET /users/:id (récupérer un utilisateur par son identifiant)
  router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      const user = await getUserUseCase.execute(req.params.id);
      return res.json(user);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: (error as Error).message });
    }
  });

  // PUT /users/:id (mettre à jour un utilisateur)
  router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      const updatedUser = await updateUserUseCase.execute(
        req.params.id,
        req.body
      );
      return res.json(updatedUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation échouée",
          errors: error.format(),
        });
      }
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof CompanyNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof DriverNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof EmailAlreadyExistsException) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: (error as Error).message });
    }
  });

  // DELETE /users/:id (supprimer un utilisateur)
  router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
      await deleteUserUseCase.execute(req.params.id);
      return res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(400).json({ message: (error as Error).message });
    }
  });

  return router;
}
