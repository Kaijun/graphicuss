import Answer from '../../models/Answer.js'
import VoteAnswer from '../../models/VoteAnswer.js'

export const load = async (req, res, next, id) => {
  let answer = await Answer.load(id)
  req.answer = answer
  return next()
}

// get all Answers
export const allAnswers = async (req, res, next) => {
  let answers = await Answer.list(req.query.questionId)
  res.json(answers)
}

// new single Answer
export const newAnswer = (req, res, next) => {
  Answer.create({
    content: req.body.content || '',
    canvas: req.body.canvas || '',
    question: req.query.questionId,
    creator: req.user._id,
  }).then((answer) => {
    return Answer.populate(answer, {path:"creator"})
  }, (err) => {
    res.status(404).json(err)
  }).then((answer) => {
    res.json(answer.toObject())
  }, (err) => {
    res.status(404).json(err)
  })
}


// get single Answer
export const getAnswer = async (req, res, next) => {

    let answer = req.answer.toObject()

    if(req.user._id) {
      let vote = await VoteAnswer.findOne({answer: answer._id, handler: req.user._id})
      answer.userVote = vote?vote.type: 0
    }
    else{
      answer.userVote = 0
    }

    res.json(answer)
}

export const editAnswer =  async (req, res, next) => {
  let answer = await req.answer.edit({
    // name: req.body.name || '',
    // desc: req.body.desc || '',
  })
  res.json(answer.toObject())
}

export const delAnswer = async (req, res, next) => {
  let answer = await req.answer.remove()
  res.json(answer.toObject())
}


export const voteAnswer =  (req, res, next) => {
  let answerId = req.params.answerId
  let userId = req.user._id
  let voteType = parseInt(req.params.voteType)
  if(voteType!==1&&voteType!==2)
    res.status(404).json({message: "Invalid Action! Unknown Vote Type"})
  VoteAnswer.findOne({answerId: answerId, handler: userId}).then((result) => {
    if(result){
      result.type = voteType
      return result.save()
    }
    else{
      return VoteAnswer.create({
        answer: answerId,
        handler: userId,
        type: voteType
      })
    }
  }).then((vote) => {
    res.json(vote.toObject())
  }, (err) => {
    console.log(err)
    res.status(404).json(err)
  })
}
