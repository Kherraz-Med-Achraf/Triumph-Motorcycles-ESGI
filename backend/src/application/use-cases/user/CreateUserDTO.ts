import { z } from "zod";

export const UserRoleEnum = z.enum([
  "ADMIN",
  "MANAGER_COMPANY",
  "MANAGER_CONCESSION",
  "CLIENT",
  "DRIVER",
]);

export const UserExperienceEnum = z.enum(["NOVICE", "INTERMEDIATE", "EXPERT"]);

export const CreateUserSchema = z
  .object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    role: UserRoleEnum,
    nom: z
      .string()
      .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    prenom: z
      .string()
      .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
    createdAt: z.date().default(() => new Date()),
    motorcycleId: z.string().uuid().optional(),
    licenseExpiration: z.string().optional(),
    licenseCountry: z.string().length(2, { message: "Le code du pays doit contenir exactement 2 caractères" }).optional(),
    licenseNumber: z.number().optional(),
    address: z.string().optional(),
    experience: UserExperienceEnum.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "DRIVER" || data.role === "CLIENT") {
      if (!data.motorcycleId) {
        ctx.addIssue({
          code: "custom",
          message: "motorcycleId est requis pour un DRIVER ou un CLIENT",
          path: ["motorcycleId"],
        });
      }
      if (!data.licenseExpiration) {
        ctx.addIssue({
          code: "custom",
          message: "licenseExpiration est requis pour un DRIVER ou un CLIENT",
          path: ["licenseExpiration"],
        });
      }
      if (!data.licenseCountry) {
        ctx.addIssue({
          code: "custom",
          message: "licenseCountry est requis pour un DRIVER ou un CLIENT",
          path: ["licenseCountry"],
        });
      }
      if (!data.licenseNumber) {
        ctx.addIssue({
          code: "custom",
          message: "licenseNumber est requis pour un DRIVER ou un CLIENT",
          path: ["licenseNumber"],
        });
      }
      if (data.role === "CLIENT" && !data.address) {
        ctx.addIssue({
          code: "custom",
          message: "address est requis pour un CLIENT",
          path: ["address"],
        });
      }
    } else {
      // Supprimer les champs interdits pour les autres rôles
      if (
        data.motorcycleId ||
        data.licenseExpiration ||
        data.licenseCountry ||
        data.licenseNumber ||
        data.address ||
        data.experience
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Les champs liés au permis et à l'expérience ne doivent pas être fournis pour ce rôle",
          path: ["role"],
        });
      }
    }
    if (data.role === "DRIVER") {
      if (!data.experience) {
        ctx.addIssue({
          code: "custom",
          message: "experience est requis pour un DRIVER",
          path: ["experience"],
        });
      }
    }
    if (data.role === "CLIENT") {
      if (data.experience) {
        ctx.addIssue({
          code: "custom",
          message: "experience ne doit pas être fourni pour un CLIENT",
          path: ["experience"],
        });
      }
    }
  });

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
