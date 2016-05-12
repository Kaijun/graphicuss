import mongoose from 'mongoose'
const Schema = mongoose.Schema

var userFavorSchema = mongoose.Schema({
  handler : { type: Schema.Types.ObjectId, ref: 'User' },
  question : { type: Schema.Types.ObjectId, ref: 'Question' },
}, {timestamps: true});

// methods ======================

export default mongoose.model('UserFavor', userFavorSchema)
