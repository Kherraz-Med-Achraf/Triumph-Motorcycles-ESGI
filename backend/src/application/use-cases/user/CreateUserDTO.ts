import { z } from "zod";
export const UserRoleEnum = z.enum(["ADMIN", "MANAGER_COMPANY", "MANAGER_CONCESSION", "CLIENT", "DRIVER"]); // ✅ Crée un enum Zod basé sur `UserRole`

export const CreateUserSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  role: UserRoleEnum,
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
