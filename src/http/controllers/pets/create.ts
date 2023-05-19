import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgDoesNotExistsError } from '@/use-cases/errors/org-does-not-exists-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.enum(['puppy', 'adult']),
    size: z.enum(['small', 'medium', 'big']),
    energyLevel: z.enum(['low', 'medium', 'high']),
    independenceLevel: z.enum(['low', 'medium', 'high']),
    type: z.enum(['dog', 'cat']),
    images: z.string(),
    adoptionRequirements: z.string(),
  })

  const createPetData = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const { pet } = await createPetUseCase.execute({
      ...createPetData,
      images: JSON.parse(createPetData.images),
      adoptionRequirements: JSON.parse(createPetData.adoptionRequirements),
      orgId: request.user.sub,
    })

    return reply.status(201).send({
      pet,
    })
  } catch (err) {
    if (err instanceof OrgDoesNotExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
