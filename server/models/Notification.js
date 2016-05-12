import mongoose from 'mongoose'
const Schema = mongoose.Schema

// define the schema for our user model
const notificationSchema = mongoose.Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User' },
  question : { type: Schema.Types.ObjectId, ref: 'Question' },
  message: { type: String, default: 'You got a new Message!' },
  isRead: {type: Boolean, default: false}
}, {timestamps: true});

// statics ======================
notificationSchema.statics.send = function(user, question, message) {
  return this.create({user, question, message}).exec()
}

notificationSchema.statics.markRead = function(_id) {
  return this.findByIdAndUpdate(_id, {isRead: true}).exec()
}

notificationSchema.statics.listByUserId = function(userId) {
  return this.find({user: userId, isRead: false}).exec()
}


// methods ======================

export default mongoose.model('Notification', notificationSchema)
