import { defineMongooseModel } from '#nuxt/mongoose'
import type { Owners } from '~/types'

export const OwnerSchema = defineMongooseModel<Owners>({
  name: 'Owner',
  schema: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    cpf: {
      type: 'string',
      required: true,
      unique: true
    },
    phone: {
      type: 'string',
      required: true
    }
  }
})