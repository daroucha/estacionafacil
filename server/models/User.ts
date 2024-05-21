import { defineMongooseModel } from '#nuxt/mongoose'
import type { Users } from '~/types'
import bcrypt from 'bcryptjs'

export const UserSchema = defineMongooseModel<Users>({
  name: 'User',
  schema: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  hooks(schema) {
    schema.pre('save', async function (this, next) {
      if (!this.isModified('password')) {
        next()
      }

      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    })
  }
})