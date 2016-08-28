import mongoose from 'mongoose'
import Question from './Question'
const Schema = mongoose.Schema

const voteQuestionSchema = mongoose.Schema({
  // Type 1: UpVote, 2: DownVote
  type: { type: Number, enum: [1,2]},
  handler : { type: Schema.Types.ObjectId, ref: 'User' },
  question : { type: Schema.Types.ObjectId, ref: 'Question' },
}, {timestamps: true});

const voteQuestionModel = mongoose.model('VoteQuestion', voteQuestionSchema)

// methods ======================
const voteHook = (doc, next) => {
  voteQuestionModel.find({question: doc.question}).then((votes) => {
    let voteCounts = votes.filter(i => i.type===1).length - votes.filter(i => i.type===2).length
    Question.findByIdAndUpdate(doc.question, {vote: voteCounts}).then(() => {
      next()
    })
  })
}
voteQuestionSchema.post('save', voteHook)
voteQuestionSchema.post('remove', voteHook)


export default voteQuestionModel
