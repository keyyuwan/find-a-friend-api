import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchFilteredPetsUseCase } from '@/use-cases/factories/make-fetch-filtered-pets-use-case'

export async function filtered(request: FastifyRequest, reply: FastifyReply) {
  const filteredPetsQuerySchema = z.object({
    city: z.string(),
    age: z.enum(['puppy', 'adult']).optional(),
    size: z.enum(['small', 'medium', 'big']).optional(),
    energyLevel: z.enum(['low', 'medium', 'high']).optional(),
    independenceLevel: z.enum(['low', 'medium', 'high']).optional(),
    type: z.enum(['dog', 'cat']).optional(),
  })

  const { city, ...query } = filteredPetsQuerySchema.parse(request.query)

  const fetchFilteredPetsUseCase = makeFetchFilteredPetsUseCase()

  const { pets } = await fetchFilteredPetsUseCase.execute({
    city,
    query: Object.keys(query).length > 0 ? query : undefined,
  })

  return reply.status(200).send({
    pets,
  })
}
