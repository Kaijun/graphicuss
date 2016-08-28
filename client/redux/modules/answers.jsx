import {createAction, handleActions } from 'redux-actions'

const getAnswersRequest = (questionId) => fetch(`/api/answers?questionId=${questionId}`)
const newAnswerRequest = (questionId, data) => fetch.postJSON(`/api/answers?questionId=${questionId}`, data)


const upvoteAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}/vote/1`, {
  method: 'post'
})

const downvoteAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}/vote/2`, {
  method: 'post'
})

const deleteAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}`, {
  method: 'delete'
})

const editAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}`, {
  method: 'put'
})





const NEW_ANSWER = 'new answer'
const GET_ANSWERS = 'get answers'

const SET_ANSWERS = 'set answers'
const UPVOTE_ANSWER = 'up answer'
const DOWNVOTE_ANSWER = 'down answer'
const EDIT_ANSWER = 'edit answer'
const DELETE_ANSWER = 'delete answer'
// Actions
const getAnswers = createAction(GET_ANSWERS, (questionId) => getAnswersRequest(questionId))
const newAnswer = createAction(NEW_ANSWER, (questionId, data) => newAnswerRequest(questionId, data))
const setAnswers = createAction(SET_ANSWERS, (answers) => answers)

const upvoteAnswer = createAction(UPVOTE_ANSWER, (answerId) => upvoteAnswerRequest(answerId).then( res => {
  res.answerId=answerId
  return res;
}))
const downvoteAnswer = createAction(DOWNVOTE_ANSWER, (answerId) => downvoteAnswerRequest(answerId).then( res => {
  res.answerId=answerId
  return res;
}))
const editAnswer = createAction(EDIT_ANSWER, (answerId) => editAnswerRequest(answerId).then( res => {
  res.answerId=answerId
  return res;
}))
const deleteAnswer = createAction(DELETE_ANSWER, (answerId) => deleteAnswerRequest(answerId).then( res => {
  res.answerId=answerId
  return res;
}))

// Exposed Actions
export const actions = {
  newAnswer,
  getAnswers,
  setAnswers,
  upvoteAnswer,
  downvoteAnswer,

  editAnswer,
  deleteAnswer,
}

// Reducers
const initialState = []

export default handleActions({
  [NEW_ANSWER] (state, action) {
    return [...state, action.payload]
  },
  [GET_ANSWERS] (state, action) {
    action.payload.sort(function(a, b) {
      return b.vote - a.vote
    })
    return [...action.payload]
  },
  [SET_ANSWERS] (state, action) {
    action.payload.sort(function(a, b) {
      return b.vote - a.vote
    })
    return [...action.payload]
  },
  [UPVOTE_ANSWER] (state, action) {
    let answer = state.filter((a) => {
      return a._id === action.payload.answerId;
    })[0]

    let vote = answer.vote
    let oldType = answer.userVote
    let newType = action.payload.type
    if(oldType===undefined || oldType===0 && newType===1)vote = vote + 1
    else if(oldType===1 && newType===0)vote = vote-1
    else if(oldType===2 && newType===1)vote = vote +2
    answer.vote = vote;
    answer.userVote = action.payload.type
    return [...state]
  },
  [DOWNVOTE_ANSWER] (state, action) {
    let answer = state.filter((a) => {
      return a._id === action.payload.answerId;
    })[0]
    let vote = answer.vote
    let oldType = answer.userVote
    let newType = action.payload.type
    if(oldType===undefined || oldType===0 && newType===2) vote = vote - 1
    else if(oldType===1 && newType===2) vote = vote - 2
    else if(oldType===2 && newType===0) vote = vote +1
    answer.vote = vote;
    answer.userVote = action.payload.type
    return [...state]
  },

  [EDIT_ANSWER] (state, action) {
    // return {...action.payload}
  },
  [DELETE_ANSWER] (state, action) {
    // return {...action.payload}
  },
  // [DELETE_COURSE] (state, action) {
  //   return state.filter(todo => todo.id !== action.payload )
  // },

}, initialState)
