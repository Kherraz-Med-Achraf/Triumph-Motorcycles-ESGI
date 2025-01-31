import { z } from 'zod';
import { UserRole } from '../../../domain/entities/UserEntity';

// schéma Zod pour valider les entrées
export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
  role: z.nativeEnum(UserRole, { message: 'Rôle invalide' }),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
