import { z } from "zod";

export const CreateConcessionSchema = z.object({
  name: z.string().min(1, "Le nom de la concession est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  managerUserId: z.string().min(1, "L'ID du manager est requis.").nullable().optional(),
});

export type CreateConcessionDTO = z.infer<typeof CreateConcessionSchema>;
