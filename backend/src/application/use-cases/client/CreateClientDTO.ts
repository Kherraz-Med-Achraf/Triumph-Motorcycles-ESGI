import { z } from "zod";

export const CreateClientSchema = z.object({
  userId: z.string().uuid("userId doit être un UUID"),
  address: z.string().optional(),
  licenseExpiration: z.string().optional(), 
  licenseCountry: z.string().optional(),
  licenseNumber: z.string().optional(),
});

export type CreateClientDTO = z.infer<typeof CreateClientSchema>;
