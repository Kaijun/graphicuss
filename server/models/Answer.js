import mongoose from 'mongoose'
import Question from './Question'
import VoteAnswer from './VoteAnswer'
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
answerSchema.statics.list = async function(questionId, userId) {
  let answers = await this.find({'question': questionId}).populate('creator quotedAnswer').exec()

  let result = []
  for( var i = 0; i < answers.length; i++){
    let answer = answers[i].toObject()
    let vote = await VoteAnswer.findOne({answer: answer._id, handler: userId});
    answer.userVote = vote ? vote.type : 0;
    result.push(answer)
  }

  return result;

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
