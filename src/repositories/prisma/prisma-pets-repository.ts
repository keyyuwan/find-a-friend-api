import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { PetFilterQuery } from '@/utils/pet-filter-types'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByCityOnQuery(city: string, query?: PetFilterQuery) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...query,
      },
    })

    return pets
  }
}
