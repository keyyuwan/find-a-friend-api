import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import supertest from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await supertest(app.server).post('/orgs').send({
      name: 'Node.js Org',
      email: 'node@org.com',
      cep: '80540-220',
      address: 'Rua da Paz, 346',
      whatsapp: '(41) 99994-1234',
      password: '123456',
      confirmPassword: '123456',
    })

    const response = await supertest(app.server).post('/sessions').send({
      email: 'node@org.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
