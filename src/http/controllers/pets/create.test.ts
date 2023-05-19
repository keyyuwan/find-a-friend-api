import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alfredo',
        about: 'Um cão saudável e feliz',
        age: 'puppy',
        size: 'small',
        energyLevel: 'high',
        independenceLevel: 'medium',
        type: 'dog',
        images: JSON.stringify(['https://github.com/keyyuwan.png']),
        adoptionRequirements: JSON.stringify([
          'Deve sair pra passear 1 vez ao dia.',
        ]),
        orgId: org.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
