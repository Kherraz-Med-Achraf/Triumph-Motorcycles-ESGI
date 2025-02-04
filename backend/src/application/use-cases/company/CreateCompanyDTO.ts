import { z } from "zod";

export const CreateCompanySchema = z.object({
  name: z.string().min(1, "Le nom de la company est requis"),
  managerUserId: z.string().uuid("managerUserId doit être un UUID"),
});

export type CreateCompanyDTO = z.infer<typeof CreateCompanySchema>;
