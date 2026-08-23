import { cnpj } from 'cpf-cnpj-validator';
import { z } from 'zod';

export const CompanySchema = z.object({
  id: z.uuid(),
  name: z
    .string({
      message: 'Nome é obrigatório.',
    })
    .min(1, { message: 'Nome é obrigatório.' }),
  cnpj: z
    .string({
      message: 'CNPJ é obrigatório.',
    })
    .refine((value) => cnpj.isValid(value), { message: 'CNPJ inválido.' }),
  fantasyName: z
    .string({ message: 'Nome fantasia é obrigatório.' })
    .min(1, { message: 'Nome fantasia é obrigatório.' }),
  address: z
    .string({ message: 'Endereço é obrigatório.' })
    .min(1, { message: 'Endereço é obrigatório.' }),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type CompanyDto = z.infer<typeof CompanySchema>;
