import mongoose from 'mongoose'
const Schema = mongoose.Schema

var commentSchema = mongoose.Schema({
  content: String,
  creator : { type: Schema.Types.ObjectId, ref: 'User' },
  replyto: { type: Schema.Types.ObjectId, ref: 'User' },
  answer : { type: Schema.Types.ObjectId, ref: 'Answer' },
  deleted : {type: Boolean, default: false},
}, {timestamps: true});

commentSchema.post('save', function(next) {
  this.vote = this.upvotes.length - this.downvotes.length
  next()
})

// methods ======================

export default mongoose.model('Comment', commentSchema)
