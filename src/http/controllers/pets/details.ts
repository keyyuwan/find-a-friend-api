import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const petDetailsParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = petDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  const { pet } = await getPetDetailsUseCase.execute({
    petId: id,
  })

  return reply.status(200).send({
    pet,
  })
}
