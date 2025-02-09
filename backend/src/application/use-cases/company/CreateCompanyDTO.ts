import { z } from "zod";


export const CreateCompanySchema = z.object({
  name: z.string().min(1, "Le nom de l'entreprise est requis."),
  address: z.string().min(1, "L'adresse est requise."),
  userId: z.string().min(1, "L'ID du manager est requis.").nullable().optional(),
});

export type CreateCompanyDTO = z.infer<typeof CreateCompanySchema>;
