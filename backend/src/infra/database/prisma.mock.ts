import { PrismaClient } from '@prisma/client/extension';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

export type PrismaMock = DeepMockProxy<PrismaClient>;

export const createPrismaMock = () => mockDeep<PrismaClient>();
