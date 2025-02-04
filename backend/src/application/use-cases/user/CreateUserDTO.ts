import { z } from "zod";

export const UserRoleEnum = z.enum([
  "ADMIN",
  "MANAGER_COMPANY",
  "MANAGER_CONCESSION",
  "CLIENT",
  "DRIVER",
]);

// On définit un schéma de base avec champs optionnels
export const CreateUserSchema = z
  .object({
    email: z.string().email({ message: "Email invalide" }),
    password: z
      .string()
      .min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
      }),
    role: UserRoleEnum,
    nom: z
      .string()
      .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    prenom: z
      .string()
      .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),

    // Champs driver/client
    licenseExpiration: z.string().optional(),
    licenseCountry: z.string().optional(),
    licenseNumber: z.string().optional(),
    motorcycleId: z.string().uuid().optional(),
    // Champs driver
    experience: z
      .enum(["NOVICE", "INTERMEDIATE", "EXPERT"], {
        message: "L'expérience doit être NOVICE, INTERMEDIATE ou EXPERT",
      })
      .optional(),
    // Champs client
    address: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // role=DRIVER
    if (data.role === "DRIVER") {
      if (!data.experience) {
        ctx.addIssue({
          code: "custom",
          message: "experience est requis pour un DRIVER",
          path: ["experience"],
        });
      }
      if (!data.licenseNumber) {
        ctx.addIssue({
          code: "custom",
          message: "licenseNumber est requis pour un DRIVER",
          path: ["licenseNumber"],
        });
      }
      if (!data.licenseExpiration) {
        ctx.addIssue({
          code: "custom",
          message: "licenseExpiration est requis pour un DRIVER",
          path: ["licenseExpiration"],
        });
      }
      if (!data.licenseCountry) {
        ctx.addIssue({
          code: "custom",
          message: "licenseCountry est requis pour un DRIVER",
          path: ["licenseCountry"],
        });
      }
    }

    // role=CLIENT
    if (data.role === "CLIENT") {
      if (!data.address) {
        ctx.addIssue({
          code: "custom",
          message: "address est requis pour un CLIENT",
          path: ["address"],
        });
      }
    }
  });

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
