import mongoose from 'mongoose'
import Question from './Question'
const Schema = mongoose.Schema

var answerSchema = mongoose.Schema({
  content: String,
  canvas: String,
  creator : { type: Schema.Types.ObjectId, ref: 'User' },
  question : { type: Schema.Types.ObjectId, ref: 'Question' },
  quotedAnswer : { type: Schema.Types.ObjectId, ref: 'Answer' },
  deleted : {type: Boolean, default: false},
  vote: {type: Number, default: 0},
}, {timestamps: true});

// methods ======================
// edit a question
answerSchema.method.edit = function(fields) {
  return this.update(fields).exec()
}
// delete a question
answerSchema.method.remove = function() {
  return this.remove().exec()
}

// statics ======================
// get all questions
answerSchema.statics.list = function(questionId) {
  return this.find({'question': questionId}).sort('+vote').populate('creator quotedAnswer').exec()
}
// get one questions
answerSchema.statics.load = function(_id) {
  return this.findById(_id).populate('creator quotedAnswer').exec()
}



const answerModel = mongoose.model('Answer', answerSchema);

// Hooks ======================
// Auto increm answerCounts in Question Model
var answersCountIncrementHook = (doc) =>{
    answerModel.find({question: doc.question}).then((answers) => {
      let answerCounts = answers.length
      Question.findByIdAndUpdate(doc.question, {answerCounts: answerCounts}).then(() => {})
    })
}
answerSchema.post('save', answersCountIncrementHook)
answerSchema.post('remove', answersCountIncrementHook)


export default answerModel
