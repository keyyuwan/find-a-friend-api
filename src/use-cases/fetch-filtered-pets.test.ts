import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchFilteredPetsUseCase } from './fetch-filtered-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchFilteredPetsUseCase

describe('Fetch Filtered Pets Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchFilteredPetsUseCase(petsRepository)

    await orgsRepository.create({
      id: 'org-id',
      name: 'Key Org',
      email: 'key@example.com',
      cep: '80540-220',
      address: 'Rua da Paz, 346',
      whatsapp: '(41) 98765-4321',
      password_hash: await hash('123456', 6),
    })
  })

  it('should be able to fetch pets by city', async () => {
    await petsRepository.create({
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'puppy',
      size: 'small',
      energy_level: 'high',
      independence_level: 'medium',
      type: 'dog',
      city: 'Curitiba',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'puppy',
      size: 'small',
      energy_level: 'high',
      independence_level: 'medium',
      type: 'dog',
      city: 'São Paulo',
      org_id: 'org-id',
    })

    const { pets } = await sut.execute({
      city: 'Curitiba',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        city: 'Curitiba',
      }),
    ])
  })

  it('should be able to fetch pets by filters', async () => {
    await petsRepository.create({
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'puppy',
      size: 'small',
      energy_level: 'low',
      independence_level: 'medium',
      type: 'dog',
      city: 'Curitiba',
      org_id: 'org-id',
    })

    await petsRepository.create({
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'adult',
      size: 'big',
      energy_level: 'high',
      independence_level: 'high',
      type: 'dog',
      city: 'Curitiba',
      org_id: 'org-id',
    })

    const { pets } = await sut.execute({
      city: 'Curitiba',
      query: {
        age: 'adult',
        energy_level: 'high',
      },
    })

    expect(pets).toHaveLength(1)
  })
})
