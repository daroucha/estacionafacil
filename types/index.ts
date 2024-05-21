import type { ObjectId } from 'mongoose'

export interface Vehicles {
  _id?: ObjectId
  brand: string
  model: string
  name: string
  plate: string
  owner: ObjectId
}

export interface Owners {
  _id: ObjectId
  name: string
  cpf: string
  email: string
  phone: string
}