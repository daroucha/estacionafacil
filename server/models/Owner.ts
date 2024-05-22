import { defineMongooseModel } from '#nuxt/mongoose'
import type { Owners } from '~/types'
import { Types } from 'mongoose'

export const OwnerSchema = defineMongooseModel<Owners>({
  name: 'Owner',
  schema: {
    name: {
      type: 'string',
      required: [true, 'Digite um nome']
    },
    email: {
      type: 'string',
      required: [true, 'Digite um e-mail'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Digite um e-mail válido',
      ],
    },
    cpf: {
      type: 'string',
      required: [true, 'Digite um CPF'],
    },
    phone: {
      type: 'string',
      required: [true, 'Digite um número de telefone']
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