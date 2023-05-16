import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const geoLocation = {
  city: 'Curitiba',
  location: {
    coordinates: {
      longitude: '-49.2596011',
      latitude: '-25.4076279',
    },
  },
}

const restHandlers = [
  rest.get('https://brasilapi.com.br/api/cep/v2/80540-220', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(geoLocation))
  }),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
