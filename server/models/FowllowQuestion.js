import mongoose from 'mongoose'
const Schema = mongoose.Schema

// define the schema for our user model
const followQuestionSchema = mongoose.Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User' },
  question : { type: Schema.Types.ObjectId, ref: 'Question' },
}, {timestamps: true});
// methods ======================

export default mongoose.model('FollowQuestion', followQuestionSchema)
