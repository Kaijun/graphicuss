import Question from '../../models/Question.js'
import VoteQuestion from '../../models/VoteQuestion.js'
import UserFavor from '../../models/UserFavor.js'

export const load = async (req, res, next, id) => {
  let question = await Question.load(id)
  req.question = question
  return next()
}

// get all Question
export const allQuestions = async (req, res, next) => {
  let questions = await Question.list(req.query.courseId)
  res.json(questions)
}

// new single Question
export const newQuestion = async (req, res, next) => {
  Question.create({
    title: req.body.title || '',
    content: req.body.content || '',
    course: req.query.courseId,
    creator: req.user._id,
  }).then((question) => {
    return Question.populate(question, {path:"creator"})
  }, (err) => {
    res.status(404).json({message: err})
  }).then((question) => {
    res.json(question.toObject())
  }, (err) => {
    res.status(404).json({message: err})
  }).then(()=>{
    // Informe all web sockets who has subscribed to the questions resources of a certain course.
    let courseId = req.query.courseId
    req.app.get('courseSocketMap')[courseId].forEach((socket)=>{
      Question.list(courseId).then((newQuestions) => {
        socket.emit('questions-changed', newQuestions);
      });
    })
  })


}


// get single Question
export const getQuestion = async (req, res, next) => {

  let question = req.question.toObject()

  if(req.user._id) {
    let vote = await VoteQuestion.findOne({question: question._id, handler: req.user._id})
    question.userVote = vote?vote.type: 0
  }
  else{
    question.userVote = 0
  }

  res.json(question)
}

export const editQuestion = async (req, res, next) => {
  let question = await req.question.edit({
    // name: req.body.name || '',
    // desc: req.body.desc || '',
  })
  res.json(question.toObject())
}

export const delQuestion = async (req, res, next) => {
  let question = await req.question.remove()
  res.json(question.toObject())
}

export const voteQuestion = async (req, res, next) => {
  let questionId = req.params.questionId
  let userId = req.user._id
  let voteType = parseInt(req.params.voteType)
  if(voteType!==1&&voteType!==2)
    res.status(404).json({message: "Invalid Action! Unknown Vote Type"})

  let vote = await VoteQuestion.findOne({question: questionId, handler: userId});
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
    await VoteQuestion.create({
      question: questionId,
      handler: userId,
      type: voteType
    })
    res.json({
      type: voteType
    })
  }


}

export const favQuestion = (req, res, next) => {
  let questionId = req.params.questionId
  let userId = req.user._id
  UserFavor.findOne({question: questionId, handler: userId}).then((result) => {
    if(result){
      return result.remove().then(data => data)
    }
    else{
      return UserFavor.create({
        question: questionId,
        handler: userId,
      })
    }
  }).then((fav) => {
    res.json(fav.toObject())
  }, (err) => {
    res.status(404).json(err)
  })
}
