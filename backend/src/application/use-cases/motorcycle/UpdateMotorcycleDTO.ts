import { z } from "zod";

export const UpdateMotorcycleSchema = z.object({
  id: z.string().uuid("L'ID de la moto doit être un UUID"),
  vin: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  concessionId: z.string().uuid().optional(),
});

export type UpdateMotorcycleDTO = z.infer<typeof UpdateMotorcycleSchema>;
