import { z } from "zod";

export const UpdateMotorcycleSchema = z.object({
  id: z.string().uuid("L'ID de la moto doit être un UUID"),
  vin: z.string().optional(),
  model: z.string().optional(),
  concessionId: z.string().uuid().optional(),

  intervalType: z.enum(["KM", "TIME"]).optional(),
  intervalValue: z.number().optional(),
});

export type UpdateMotorcycleDTO = z.infer<typeof UpdateMotorcycleSchema>;
