import {createAction, handleActions } from 'redux-actions'

const getAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}`)

const upvoteAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}/vote/1`, {
  method: 'post'
})

const downvoteAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}/vote/2`, {
  method: 'post'
})

const favAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}/favor`, {
  method: 'post'
})

const deleteAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}`, {
  method: 'delete'
})

const editAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}`, {
  method: 'put'
})

const GET_ANSWER = 'get answer'
const UPVOTE_ANSWER = 'up answer'
const DOWNVOTE_ANSWER = 'down answer'
const FAV_ANSWER = 'fav answer'
const EDIT_ANSWER = 'edit answer'
const DELETE_ANSWER = 'delete answer'
// Actions
const getAnswer = createAction(GET_ANSWER, (data) => getAnswerRequest(data))
const upvoteAnswer = createAction(UPVOTE_ANSWER, (data) => upvoteAnswerRequest(data))
const downvoteAnswer = createAction(DOWNVOTE_ANSWER, (data) => downvoteAnswerRequest(data))
const favAnswer = createAction(FAV_ANSWER, (data) => favAnswerRequest(data))
const editAnswer = createAction(EDIT_ANSWER, (data) => editAnswerRequest(data))
const deleteAnswer = createAction(DELETE_ANSWER, (data) => deleteAnswerRequest(data))

// Exposed Actions
export const actions = {
  getAnswer,
  upvoteAnswer,
  downvoteAnswer,
  favAnswer,
  editAnswer,
  deleteAnswer,
}

// Reducers
const initialState = {}

export default handleActions({
  [GET_ANSWER] (state, action) {
    return {...action.payload}
  },
  [UPVOTE_ANSWER] (state, action) {
    let vote = state.vote
    let oldType = state.userVote
    let newType = action.payload.type
    if(oldType===0 && newType===1)vote = vote + 1
    else if(oldType===1 && newType===0)vote = vote-1
    else if(oldType===2 && newType===1)vote = vote +2
    return {...state, userVote: action.payload.type, vote: vote}
  },
  [DOWNVOTE_ANSWER] (state, action) {
    let vote = state.vote
    let oldType = state.userVote
    let newType = action.payload.type
    if(oldType===0 && newType===2) vote = vote - 1
    else if(oldType===1 && newType===2) vote = vote - 2
    else if(oldType===2 && newType===0) vote = vote +1
    return {...state, userVote: action.payload.type, vote: vote}
  },
  [FAV_ANSWER] (state, action) {
    return {...action.payload}
  },
  [EDIT_ANSWER] (state, action) {
    return {...action.payload}
  },
  [DELETE_ANSWER] (state, action) {
    return {...action.payload}
  },

}, initialState)
