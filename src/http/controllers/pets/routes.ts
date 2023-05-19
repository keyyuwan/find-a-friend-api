import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { details } from './details'
import { filtered } from './filtered'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', details)
  app.get('/pets', filtered)

  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
