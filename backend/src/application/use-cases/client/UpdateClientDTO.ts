import { z } from "zod";

export const UpdateClientSchema = z.object({
  id: z.string().uuid("L'ID du client doit être un UUID"),
  address: z.string().optional(),
  licenseExpiration: z.string().optional(),
  licenseCountry: z.string().optional(),
  licenseNumber: z.string().optional(),
});

export type UpdateClientDTO = z.infer<typeof UpdateClientSchema>;
