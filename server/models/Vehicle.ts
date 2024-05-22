import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'
import type { Vehicles } from '~/types'

export const VehicleSchema = defineMongooseModel<Vehicles>({
  name: 'Vehicle',
  schema: {
    brand: {
      type: 'string',
      required: [true, 'Digite a Marca']
    },
    model: {
      type: 'string',
      required: [true, 'Digite o Modelo']
    },
    name: 'string',
    plate: {
      type: 'string',
      required: [true, 'Digite a Placa']
    },
    owner: {
      type: Types.ObjectId,
      ref: 'Owner',
      required: [true, 'Informe o proprietário']
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    }
  }
})