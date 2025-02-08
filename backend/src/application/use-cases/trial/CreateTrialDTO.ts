import { z } from "zod";

export const CreateTrialSchema = z.object({
  clientId: z.string().uuid("clientId doit être un UUID"),
  motorcycleId: z.string().uuid("motorcycleId doit être un UUID"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),   
});

export type CreateTrialDTO = z.infer<typeof CreateTrialSchema>;
