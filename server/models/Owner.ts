import { defineMongooseModel } from '#nuxt/mongoose'
import type { Owners } from '~/types'
import { Types } from 'mongoose'

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
    },
    cpf: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      required: true
    },
    vehicles: [{
      type: Types.ObjectId,
      ref: 'Vehicle'
    }],
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
})