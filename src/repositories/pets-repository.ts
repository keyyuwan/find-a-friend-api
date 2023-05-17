import { Pet, Prisma } from '@prisma/client'
import { PetFilterQuery } from '@/utils/pet-filter-types'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByCityOnQuery(city: string, query?: PetFilterQuery): Promise<Pet[]>
}
