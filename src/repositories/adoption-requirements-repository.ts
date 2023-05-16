import { Prisma } from '@prisma/client'

export interface AdoptionRequirementsRepository {
  createMany(data: Prisma.AdoptionRequirementCreateManyInput[]): Promise<void>
}
