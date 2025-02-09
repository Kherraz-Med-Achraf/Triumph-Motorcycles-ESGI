import { z } from "zod";

export const UpdateCompanySchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  userId: z.string().min(1).nullable().optional(),
});

export type UpdateCompanyDTO = z.infer<typeof UpdateCompanySchema>;
