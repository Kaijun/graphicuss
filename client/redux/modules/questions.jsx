import {createAction, handleActions } from 'redux-actions'

const getQuestionsRequest = (courseId) => fetch(`/api/questions?courseId=${courseId}`)
const newQuestionRequest = (courseId, data) => fetch.postJSON(`/api/questions?courseId=${courseId}`, data)


const NEW_QUESTION = 'new question'
const GET_QUESTIONS = 'get questions'
const SET_QUESTIONS = 'set questions'
// Actions
const getQuestions = createAction(GET_QUESTIONS, (courseId) => getQuestionsRequest(courseId))
const setQuestions = createAction(SET_QUESTIONS, (questions) => questions)
const newQuestion = createAction(NEW_QUESTION, (courseId, data) => newQuestionRequest(courseId, data))


// Exposed Actions
export const actions = {
  newQuestion,
  getQuestions,
  setQuestions
}

// Reducers
const initialState = []

export default handleActions({
  [NEW_QUESTION] (state, action) {
    return [action.payload, ...state]
  },
  [GET_QUESTIONS] (state, action) {
    return [...action.payload]
  },
  [SET_QUESTIONS] (state, action) {
    return [...action.payload]
  },

  // [DELETE_COURSE] (state, action) {
  //   return state.filter(todo => todo.id !== action.payload )
  // },

}, initialState)
