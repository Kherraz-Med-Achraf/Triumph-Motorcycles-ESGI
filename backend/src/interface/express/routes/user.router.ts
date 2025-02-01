// src/interface/express/routes/user.router.ts
import { Router, Request, Response } from 'express';
import { ZodError } from 'zod';

import { CreateUserUseCase } from '../../../application/use-cases/user/CreateUserUseCase';
import { LoginUserUseCase } from '../../../application/use-cases/user/LoginUserUseCase';
import { EmailAlreadyExistsException } from '../../../domain/exceptions/EmailAlreadyExistsException';
import { AuthService } from '../../../infrastructure/auth/AuthService';
import { authMiddleware } from '../middlewares/authMiddleware';

export function createUserRouter(
  createUserUseCase: CreateUserUseCase,
  loginUserUseCase: LoginUserUseCase
) {
  const router = Router();

  // ------------------------
  // POST /users/register
  // ------------------------
  router.post('/register', async (req: Request, res: Response) => {
    try {
      const result = await createUserUseCase.execute(req.body);
      // On renvoie directement l'objet créé
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

  // ------------------------
  // POST /users/login
  // ------------------------
  router.post('/login', async (req: Request, res: Response) => {
    try {
      const user = await loginUserUseCase.execute(req.body);

      // Générer un token (même logique que Nest)
      const token = AuthService.generateToken(user);
      return res.json({ message: "Connexion réussie", token });

    } catch (error) {
      if (error instanceof ZodError) {
        // Validation Zod
        return res.status(400).json({
          message: "Validation failed",
          errors: JSON.parse(error.message),
        });
      }
      // Autre erreur => user introuvable, mdp faux, etc.
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
  });

  // ------------------------
  // GET /users/me (protégé)
  // ------------------------
  // On applique le authMiddleware pour vérifier le token
  router.get('/me', authMiddleware, (req: Request, res: Response) => {
    // On a stocké l'objet user décodé dans req.user
    const user = (req as any).user;
    return res.json({ message: "Profil utilisateur", user });
  });

  return router;
}
