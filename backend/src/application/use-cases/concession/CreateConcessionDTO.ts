import { z } from "zod";

export const CreateConcessionSchema = z.object({
  name: z.string().min(1, "Le nom de la concession est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  managerUserId: z.string().uuid("managerUserId doit être un UUID"),
});

export type CreateConcessionDTO = z.infer<typeof CreateConcessionSchema>;
