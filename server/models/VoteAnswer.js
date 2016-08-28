import mongoose from 'mongoose'
import Answer from './Answer'
const Schema = mongoose.Schema

const voteAnswerSchema = mongoose.Schema({
  // Type 1: UpVote, 2: DownVote
  type: { type: Number, enum: [1,2]},
  handler : { type: Schema.Types.ObjectId, ref: 'User' },
  answer : { type: Schema.Types.ObjectId, ref: 'Answer' },
}, {timestamps: true});

const voteAnswerModel = mongoose.model('VoteAnswer', voteAnswerSchema)

// methods ======================
const voteHook = (doc, next) => {
  voteAnswerModel.find({answer: doc.answer}).then((votes) => {
    let voteCounts = votes.filter(i => i.type===1).length - votes.filter(i => i.type===2).length
    Answer.findByIdAndUpdate(doc.answer, {vote: voteCounts}).then(() => {
      next()
    })
  })
}
voteAnswerSchema.post('save', voteHook)
voteAnswerSchema.post('remove', voteHook)
export default voteAnswerModel
