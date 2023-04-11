import validator from 'validator'
import { Schema, model, Types } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Please provide a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) => password.length >= 6,
      message: 'Password must be at least 6 characters long',
    },
  },
  tasks: [{
    taskId: {
      type: Types.ObjectId,
      ref: 'Task',
      required: true
    }
  }]
})

export default model('User', userSchema)