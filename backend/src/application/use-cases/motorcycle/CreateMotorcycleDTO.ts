import { z } from "zod";

export const CreateMotorcycleSchema = z.object({
  vin: z.string().min(1, "VIN requis"),
  model: z.string().min(1, "Le modèle est requis"),
  concessionId: z.string().uuid("concessionId doit être un UUID"),

  // Interval
  intervalType: z.enum(["KM", "TIME"]),
  intervalValue: z.number(),
});

export type CreateMotorcycleDTO = z.infer<typeof CreateMotorcycleSchema>;
