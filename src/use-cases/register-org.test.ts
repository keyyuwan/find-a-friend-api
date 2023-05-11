import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      name: 'Key Org',
      email: 'key@example.com',
      cep: '80540-220',
      address: 'Rua da Paz, 346',
      whatsapp: '(41) 98765-4321',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Key Org',
      email: 'key@example.com',
      cep: '80540-220',
      address: 'Rua da Paz, 346',
      whatsapp: '(41) 98765-4321',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register an org that already exists', async () => {
    const email = 'key@example.com'

    await sut.execute({
      name: 'Key Org',
      email,
      cep: '80540-220',
      address: 'Rua da Paz, 346',
      whatsapp: '(41) 98765-4321',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Key Org',
        email,
        cep: '80540-220',
        address: 'Rua da Paz, 346',
        whatsapp: '(41) 98765-4321',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
