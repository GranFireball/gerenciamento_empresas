import { CompanySchema } from './company.schema';
import { z } from 'zod';

export const CreateCompanySchema = CompanySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export type CreateCompanyDto = z.infer<typeof CreateCompanySchema>;
