import { Router, Request, Response } from "express";
import { ZodError } from "zod";

import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUser/CreateUserUseCase";
import { LoginUserUseCase } from "../../../application/use-cases/user/LoginUserUseCase";
import { GetAllUsersUseCase } from "../../../application/use-cases/user/GetAllUsersUseCase";

import { EmailAlreadyExistsException } from "../../../domain/exceptions/EmailAlreadyExistsException";
import { AuthService } from "../../../infrastructure/auth/AuthService";
import { authMiddleware } from "../middlewares/authMiddleware";

export function createUserRouter(
  createUserUseCase: CreateUserUseCase,
  loginUserUseCase: LoginUserUseCase,
  getAllUsersUseCase: GetAllUsersUseCase
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
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });

  // POST /users/login
  router.post("/login", async (req: Request, res: Response) => {
    try {
      const user = await loginUserUseCase.execute(req.body);

      // Générer un token (même logique que Nest)
      const token = AuthService.generateToken(user);
      return res.json({ message: "Connexion réussie", token });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: JSON.parse(error.message),
        });
      }
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
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
      return res.status(500).json({ message: "Erreur serveur", details: error });
    }
  });

  return router;
}
