import { z } from "zod";

export const UpdateConcessionSchema = z.object({
  id: z.string().uuid("L'ID de la concession doit être un UUID"),
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  managerUserId: z.string().uuid().optional(),
});

export type UpdateConcessionDTO = z.infer<typeof UpdateConcessionSchema>;
