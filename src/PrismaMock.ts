import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy} from 'jest-mock-extended';
import PrismaInstance from './PrismaInstance';

jest.mock('./PrismaInstance', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

const PrismaMock = PrismaInstance as unknown as DeepMockProxy<PrismaClient>;

export { PrismaMock }
