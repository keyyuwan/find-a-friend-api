import { randomUUID } from 'node:crypto'
import { AdoptionRequirement, Prisma } from '@prisma/client'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  public items: AdoptionRequirement[] = []

  async createMany(data: Prisma.AdoptionRequirementCreateManyInput[]) {
    data.forEach((requirement) => {
      this.items.push({
        id: requirement.id ?? randomUUID(),
        requirement: requirement.requirement,
        pet_id: requirement.pet_id,
      })
    })
  }
}
