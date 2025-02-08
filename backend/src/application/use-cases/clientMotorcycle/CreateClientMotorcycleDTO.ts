import { z } from "zod";

export const CreateClientMotorcycleSchema = z.object({
  clientId: z.string().uuid("clientId doit être un UUID"),
  motorcycleId: z.string().uuid("motorcycleId doit être un UUID"),
  assignedAt: z.string().optional(),
});

export type CreateClientMotorcycleDTO = z.infer<typeof CreateClientMotorcycleSchema>;
