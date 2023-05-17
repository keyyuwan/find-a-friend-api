export type PetAge = 'puppy' | 'adult'

export type PetSize = 'small' | 'medium' | 'big'

export type PetEnergyLevel = 'low' | 'medium' | 'high'

export type PetIndependenceLevel = 'low' | 'medium' | 'high'

export type PetType = 'dog' | 'cat'

export interface PetFilterQuery {
  age?: PetAge
  size?: PetSize
  energy_level?: PetEnergyLevel
  independence_level?: PetIndependenceLevel
  type?: PetType | 'all'
}
