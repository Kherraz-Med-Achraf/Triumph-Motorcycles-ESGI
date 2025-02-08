import { z } from "zod";

export const CreateMotorcycleSchema = z.object({
  vin: z.string().min(1, "Le VIN est requis"),
  model: z.string().min(1, "Le modèle est requis"),
  concessionId: z.string().uuid("concessionId doit être un UUID"),
});

export type CreateMotorcycleDTO = z.infer<typeof CreateMotorcycleSchema>;
