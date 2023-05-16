import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgDoesNotExistsError } from './errors/org-does-not-exists-error'
import { getGeoLocationByCEP } from '@/utils/get-geo-location-by-cep'

interface CreatePetUseCaseRequest {
  name: string
  about: string | null
  age: string
  size: string
  energyLevel: string
  independenceLevel: string
  type: string
  images: string[]
  adoptionRequirements: string[]
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    type,
    images,
    adoptionRequirements,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgDoesNotExistsError()
    }

    const { city } = await getGeoLocationByCEP(org.cep)

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      independence_level: independenceLevel,
      type,
      city,
      org_id: orgId,
    })

    if (adoptionRequirements.length > 0) {
      const requirements = adoptionRequirements.map((requirement) => {
        return {
          requirement,
          pet_id: pet.id,
        }
      })

      await this.adoptionRequirementsRepository.createMany(requirements)
    }

    // registrar imagens

    return { pet }
  }
}
