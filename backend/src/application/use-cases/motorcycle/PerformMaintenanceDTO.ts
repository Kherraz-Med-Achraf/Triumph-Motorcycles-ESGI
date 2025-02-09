import { z } from "zod";

export const PerformMaintenanceSchema = z.object({
  motorcycleId: z.string().uuid("motorcycleId doit être un UUID"),
  currentDate: z.string().optional(), 
  currentMileage: z.number().optional(),
});

export type PerformMaintenanceDTO = z.infer<typeof PerformMaintenanceSchema>;
