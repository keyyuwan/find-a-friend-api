import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      name: 'Node.js Org',
      email: 'node@org.com',
      cep: '80540-220',
      address: 'Rua da Paz, 346',
      whatsapp: '(41) 99994-1234',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'node@org.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
