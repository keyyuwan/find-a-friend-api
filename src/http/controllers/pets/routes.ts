import { FastifyInstance } from 'fastify'

import { create } from './create'
import { details } from './details'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', details)

  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
