import {createAction, handleActions } from 'redux-actions'

const getQuestionRequest = (questionId) => fetch(`/api/questions/${questionId}`)

const upvoteQuestionRequest = (questionId) => fetch(`/api/questions/${questionId}/vote/1`, {
  method: 'post'
})

const downvoteQuestionRequest = (questionId) => fetch(`/api/questions/${questionId}/vote/2`, {
  method: 'post'
})

const favQuestionRequest = (questionId) => fetch(`/api/questions/${questionId}/favor`, {
  method: 'post'
})

const deleteQuestionRequest = (questionId) => fetch(`/api/questions/${questionId}`, {
  method: 'delete'
})

const editQuestionRequest = (questionId) => fetch(`/api/questions/${questionId}`, {
  method: 'put'
})

const GET_QUESTION = 'get question'
const UPVOTE_QUESTION = 'up question'
const DOWNVOTE_QUESTION = 'down question'
const FAV_QUESTION = 'fav question'
const EDIT_QUESTION = 'edit question'
const DELETE_QUESTION = 'delete question'
// Actions
const getQuestion = createAction(GET_QUESTION, (data) => getQuestionRequest(data))
const upvoteQuestion = createAction(UPVOTE_QUESTION, (data) => upvoteQuestionRequest(data))
const downvoteQuestion = createAction(DOWNVOTE_QUESTION, (data) => downvoteQuestionRequest(data))
const favQuestion = createAction(FAV_QUESTION, (data) => favQuestionRequest(data))
const editQuestion = createAction(EDIT_QUESTION, (data) => editQuestionRequest(data))
const deleteQuestion = createAction(DELETE_QUESTION, (data) => deleteQuestionRequest(data))

// Exposed Actions
export const actions = {
  getQuestion,
  upvoteQuestion,
  downvoteQuestion,
  favQuestion,
  editQuestion,
  deleteQuestion,
}

// Reducers
const initialState = {}

export default handleActions({
  [GET_QUESTION] (state, action) {
    return {...action.payload}
  },
  [UPVOTE_QUESTION] (state, action) {
    let vote = state.vote
    let oldType = state.userVote
    let newType = action.payload.type
    if(oldType===0 && newType===1)vote = vote + 1
    else if(oldType===1 && newType===0)vote = vote-1
    else if(oldType===2 && newType===1)vote = vote +2
    return {...state, userVote: action.payload.type, vote: vote}
  },
  [DOWNVOTE_QUESTION] (state, action) {
    let vote = state.vote
    let oldType = state.userVote
    let newType = action.payload.type
    if(oldType===0 && newType===2) vote = vote - 1
    else if(oldType===1 && newType===2) vote = vote - 2
    else if(oldType===2 && newType===0) vote = vote +1
    return {...state, userVote: action.payload.type, vote: vote}
  },
  [FAV_QUESTION] (state, action) {
    return {...action.payload}
  },
  [EDIT_QUESTION] (state, action) {
    return {...action.payload}
  },
  [DELETE_QUESTION] (state, action) {
    return {...action.payload}
  },

}, initialState)
