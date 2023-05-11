import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  about?: string
  age: Pet['age']
  size: Pet['size']
  energyLevel: Pet['energy_level']
  independenceLevel: Pet['independence_level']
  environment: Pet['environment']
  imagesUrl: string[]
  adoptionRequirements: string[]
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    environment,
    imagesUrl,
    adoptionRequirements,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      environment,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      images_url: imagesUrl,
      adoption_requirements: adoptionRequirements,
      org_id: orgId,
    })

    return { pet }
  }
}
