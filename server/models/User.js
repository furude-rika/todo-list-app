const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: [{
    taskId: {
      type: Types.ObjectId,
      ref: 'Task',
      required: true
    }
  }]
})

module.exports = model('User', userSchema)