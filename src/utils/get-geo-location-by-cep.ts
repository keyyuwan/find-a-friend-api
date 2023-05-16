import { api } from '@/lib/api'

interface GetGeoLocationByCEPResponse {
  city: string
  location: {
    coordinates: {
      longitude: string
      latitude: string
    }
  }
}

export async function getGeoLocationByCEP(cep: string) {
  const { data } = await api.get<GetGeoLocationByCEPResponse>(
    `https://brasilapi.com.br/api/cep/v2/${cep}`,
  )

  const geoLocation = {
    city: data.city,
    location: {
      coordinates: data.location.coordinates,
    },
  }

  return geoLocation
}
