import { Schema, model, Types } from 'mongoose'

const taskSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User'
  }
})

export default model('Task', taskSchema)