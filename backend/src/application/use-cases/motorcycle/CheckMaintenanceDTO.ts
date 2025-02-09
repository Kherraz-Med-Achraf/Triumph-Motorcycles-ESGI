
import { z } from "zod";

export const CheckMaintenanceSchema = z.object({
  motorcycleId: z.string().uuid("motorcycleId doit être un UUID"),
  currentMileage: z.number().optional(), 
  currentDate: z.string().optional(), 
});

export type CheckMaintenanceDTO = z.infer<typeof CheckMaintenanceSchema>;
