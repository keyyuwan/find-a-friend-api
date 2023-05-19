import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'

describe('Filtered Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch filtered pets', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    await request(app.server)
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

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Curitiba',
        age: 'puppy',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets[0]).toEqual(
      expect.objectContaining({
        city: 'Curitiba',
        age: 'puppy',
      }),
    )
  })
})
