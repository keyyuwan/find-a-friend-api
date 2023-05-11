import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      cep: z.string(),
      address: z.string(),
      whatsapp: z.string(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword
      },
      {
        path: ['confirmPassword'],
        message: 'Password and Confirm password must match.',
      },
    )

  const { name, email, cep, address, whatsapp, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      email,
      cep,
      address,
      whatsapp,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
