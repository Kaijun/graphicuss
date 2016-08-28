import Answer from '../../models/Answer.js'
import VoteAnswer from '../../models/VoteAnswer.js'

export const load = async (req, res, next, id) => {
  let answer = await Answer.load(id)
  req.answer = answer
  return next()
}

// get all Answers
export const allAnswers = async (req, res, next) => {
  let answers = await Answer.list(req.query.questionId, req.user._id);

  res.json(answers)
}

// new single Answer
export const newAnswer = (req, res, next) => {
  Answer.create({
    content: req.body.content || '',
    canvas: req.body.canvas || '',
    quotedAnswer: req.body.quotedAnswer || undefined,
    question: req.query.questionId,
    creator: req.user._id,
  }).then((answer) => {
    return Answer.populate(answer, {path:"creator quotedAnswer"})
  }, (err) => {
    res.status(404).json(err)
  }).then((answer) => {
    res.json(answer.toObject())
  }, (err) => {
    res.status(404).json(err)
  }).then(()=>{
    // Informe all web sockets who has subscribed to the answers resources of a certain question.
    let questionId = req.query.questionId
    req.app.get('questionSocketMap')[questionId].forEach((socket)=>{
      Answer.list(questionId, req.user._id).then((newAnswers) => {
        socket.emit('answers-changed', newAnswers);
      });
    })
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


export const voteAnswer =  async (req, res, next) => {
  let answerId = req.params.answerId
  let userId = req.user._id
  let voteType = parseInt(req.params.voteType)
  if(voteType!==1&&voteType!==2)
    res.status(404).json({message: "Invalid Action! Unknown Vote Type"})

  let vote = await VoteAnswer.findOne({answer: answerId, handler: userId});
  if(vote){
    if(vote.type == voteType){
      await vote.remove();
      res.json({
        type: 0
      })
    }
    else{
      vote.type = voteType
      await vote.save();
      res.json({
        type: voteType
      })
    }
  }
  else{
    await VoteAnswer.create({
      answer: answerId,
      handler: userId,
      type: voteType
    })
    res.json({
      type: voteType
    })
  }

  // Informe all web sockets who has subscribed to the answers resources of a certain question.
  let questionId = req.answer.question
  req.app.get('questionSocketMap')[questionId].forEach((socket)=>{
    Answer.list(questionId, req.user._id).then((newAnswers) => {
      socket.emit('answers-changed', newAnswers);
    });
  })

}
