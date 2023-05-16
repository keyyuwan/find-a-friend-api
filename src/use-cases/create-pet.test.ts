import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoption-requirements-repository'
import { CreatePetUseCase } from './create-pet'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    sut = new CreatePetUseCase(
      petsRepository,
      adoptionRequirementsRepository,
      orgsRepository,
    )
  })

  it('should be able to create a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Key Org',
      email: 'key@example.com',
      cep: '80540-220',
      address: 'Rua da Paz, 346',
      whatsapp: '(41) 98765-4321',
      password_hash: await hash('123456', 6),
    })

    const { pet } = await sut.execute({
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'puppy',
      size: 'small',
      energyLevel: 'high',
      independenceLevel: 'medium',
      type: 'dog',
      images: [''],
      adoptionRequirements: ['Espaço grande pro cão brincar'],
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.city).toEqual('Curitiba')
  })
})
