import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'
import type { Vehicles } from '~/types'

export const VehicleSchema = defineMongooseModel<Vehicles>({
  name: 'Vehicle',
  schema: {
    brand: {
      type: 'string',
      required: true
    },
    model: {
      type: 'string',
      required: true
    },
    name: 'string',
    plate: {
      type: 'string',
      required: true
    },
    owner: {
      type: Types.ObjectId,
      ref: 'Owner',
      required: true
    }
  }
})