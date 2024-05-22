import type { ObjectId } from 'mongoose'
import type { JWTPayload } from 'jose'

export interface AuthPayload extends JWTPayload {
  username?: string
}

export interface Vehicles {
  _id?: ObjectId
  brand: string
  model: string
  name?: string
  plate: string
  owner?: Owners
  user?: ObjectId
}

export interface Owners {
  _id?: ObjectId
  name: string
  cpf: string
  email: string
  phone: string
  vehicles?: Vehicles[]
  user?: ObjectId
}

export interface Users {
  _id: ObjectId
  username: string
  password: string
  createdAt: Date
}