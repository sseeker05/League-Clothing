const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
  roll:{
    type: String,default:"user"

  },
  profileImage: {
    type: String,
  },
  bio:{
    type: String, 
    maxlength: 200
  },
  profession: String, 
  createdAt: {type: Date, default: Date.now}
})

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  }
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}


const User  = model('User', userSchema)

module.exports = User
