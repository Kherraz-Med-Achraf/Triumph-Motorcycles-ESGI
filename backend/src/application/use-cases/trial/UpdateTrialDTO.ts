import { z } from "zod";

export const UpdateTrialSchema = z.object({
  id: z.string().uuid("L'ID du trial doit être un UUID"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  clientId: z.string().uuid().optional(),
  motorcycleId: z.string().uuid().optional(),
});

export type UpdateTrialDTO = z.infer<typeof UpdateTrialSchema>;
