import { z } from "zod";

// Vous pouvez réutiliser l'énumération existante si elle est exportée
export const UserExperienceEnum = z.enum(["NOVICE", "INTERMEDIATE", "EXPERT"]);

export const UpdateUserSchema = z.object({
  email: z.string().email({ message: "Email invalide" }).optional(),
  password: z
    .string()
    .min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    })
    .optional(),
  nom: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .optional(),
  prenom: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" })
    .optional(),

  // Champs DRIVER 
  experience: UserExperienceEnum.optional(),
  licenseExpiration: z.string().optional(), // On traitera la conversion en Date dans le use case
  licenseCountry: z
    .string()
    .length(2, {
      message: "Le code du pays doit contenir exactement 2 caractères",
    })
    .optional(),
  licenseNumber: z.string().optional(),
  companyId: z.string().uuid().optional(),
  companyMotorcycleId: z.string().uuid().optional(),

  // Champs CLIENT
  address: z.string().optional(),
});

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
