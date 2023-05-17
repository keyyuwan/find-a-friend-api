import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchFilteredPetsUseCase } from '../fetch-filtered-pets'

export function makeFetchFilteredPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchFilteredPetsUseCase(petsRepository)

  return useCase
}
