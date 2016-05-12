import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
const Schema = mongoose.Schema

// define the schema for our user model
var userSchema = mongoose.Schema({
  username: String,
  email: {type: String, lowercase: true, trim: true, unique: true},
  password: {type: String, select: false},
  tutor: {type: Boolean, default: false},
  admin: {type: Boolean, default: false},
  subscriptions: {type: [{type: Schema.Types.ObjectId, ref: 'Course'}], default: []}
}, {timestamps: true});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

// toggle subscription
userSchema.methods.toggleSubscription = function(courseId) {
  if(this.subscriptions.indexOf(courseId) === -1) {
    this.subscriptions.push(courseId)
  }
  else{
    this.subscriptions.pull(courseId);
  }
  return this.save()
}

export default mongoose.model('User', userSchema)
