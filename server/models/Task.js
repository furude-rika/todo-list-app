const {Schema, model, Types} = require('mongoose')

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

module.exports = model('Task', taskSchema)