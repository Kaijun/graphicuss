import {createAction, handleActions } from 'redux-actions'

const getAnswersRequest = (questionId) => fetch(`/api/answers?questionId=${questionId}`)
const newAnswerRequest = (questionId, data) => fetch.postJSON(`/api/answers?questionId=${questionId}`, data)


const NEW_ANSWER = 'new answer'
const GET_ANSWERS = 'get answers'
// Actions
const getAnswers = createAction(GET_ANSWERS, (questionId) => getAnswersRequest(questionId))
const newAnswer = createAction(NEW_ANSWER, (questionId, data) => newAnswerRequest(questionId, data))


// Exposed Actions
export const actions = {
  newAnswer,
  getAnswers
}

// Reducers
const initialState = []

export default handleActions({
  [NEW_ANSWER] (state, action) {
    return [...state, action.payload]
  },
  [GET_ANSWERS] (state, action) {
    return [...action.payload]
  },

  // [DELETE_COURSE] (state, action) {
  //   return state.filter(todo => todo.id !== action.payload )
  // },

}, initialState)
