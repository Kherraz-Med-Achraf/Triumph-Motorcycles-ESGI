import { z } from "zod";

export const UpdateClientMotorcycleSchema = z.object({
  id: z.string().uuid("id doit être un UUID"),
  clientId: z.string().uuid().optional(),
  motorcycleId: z.string().uuid().optional(),
  assignedAt: z.string().optional(),
});

export type UpdateClientMotorcycleDTO = z.infer<typeof UpdateClientMotorcycleSchema>;
