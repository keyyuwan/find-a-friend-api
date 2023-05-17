import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { PetFilterQuery } from '@/utils/pet-filter-types'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      type: data.type,
      city: data.city,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCityOnQuery(city: string, query?: PetFilterQuery) {
    const petsByCity = this.items.filter((item) => item.city === city)

    if (!query) {
      return petsByCity
    }

    return petsByCity.filter((item) => {
      for (const key in query) {
        // @ts-ignore
        if (item[key] !== query[key]) {
          return false
        }
      }

      return true
    })
  }
}
