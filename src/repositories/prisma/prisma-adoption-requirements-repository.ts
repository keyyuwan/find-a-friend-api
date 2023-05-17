import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async createMany(data: Prisma.AdoptionRequirementCreateManyInput[]) {
    await prisma.adoptionRequirement.createMany({
      data,
    })
  }
}
