import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { PetFilterQuery } from '@/utils/pet-filter-types'

interface FetchFilteredPetsUseCaseRequest {
  city: string
  query?: PetFilterQuery
}

interface FetchFilteredPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchFilteredPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    query,
  }: FetchFilteredPetsUseCaseRequest): Promise<FetchFilteredPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCityOnQuery(city, query)

    return { pets }
  }
}
