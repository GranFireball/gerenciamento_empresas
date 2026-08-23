import { CompanySchema } from './company.schema';
import { z } from 'zod';

export const UpdateCompanySchema = CompanySchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export type UpdateCompanyDto = z.infer<typeof UpdateCompanySchema>;
