import mongoose from 'mongoose'
const Schema = mongoose.Schema
// If it's better to merge Question and Answer as a single collection "Post", like StackOverflow did.
var questionSchema = mongoose.Schema({
  title: String,
  content: String,
  creator : { type: Schema.Types.ObjectId, ref: 'User' },
  course : { type: Schema.Types.ObjectId, ref: 'Course' },
  acceptedAnswer : { type: Schema.Types.ObjectId, ref: 'Answer' },
  deleted : {type: Boolean, default: false},
  vote: {type: Number, default: 0},
}, {timestamps: true});


// methods ======================
// edit a question
questionSchema.method.edit = function(fields) {
  return this.update(fields).exec()
}
// delete a question
questionSchema.method.remove = function() {
  return this.remove().exec()
}

// statics ======================
// get all questions
questionSchema.statics.list = function(courseId) {
  return this.find({'course': courseId}).sort('-createdAt').populate('creator').exec()
}
// get one questions
questionSchema.statics.load = function(_id) {
  return this.findById(_id).populate('creator').exec()
}

export default mongoose.model('Question', questionSchema)
