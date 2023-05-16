import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get details from a pet', async () => {
    const org = await orgsRepository.create({
      name: 'Key Org',
      email: 'key@example.com',
      cep: '80540-220',
      address: 'Rua da Paz, 346',
      whatsapp: '(41) 98765-4321',
      password_hash: await hash('123456', 6),
    })

    const petCreated = await petsRepository.create({
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'puppy',
      size: 'small',
      energy_level: 'high',
      independence_level: 'medium',
      type: 'dog',
      city: 'Curitiba',
      org_id: org.id,
    })

    const { pet } = await sut.execute({
      petId: petCreated.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get details from a pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
