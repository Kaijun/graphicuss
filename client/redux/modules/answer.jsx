import {createAction, handleActions } from 'redux-actions'

const getAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}`)



const favAnswerRequest = (answerId) => fetch(`/api/answers/${answerId}/favor`, {
  method: 'post'
})

const GET_ANSWER = 'get answer'

const FAV_ANSWER = 'fav answer'

// Actions
const getAnswer = createAction(GET_ANSWER, (data) => getAnswerRequest(data))
const favAnswer = createAction(FAV_ANSWER, (data) => favAnswerRequest(data))

// Exposed Actions
export const actions = {
  getAnswer,
  favAnswer,
}

// Reducers
const initialState = {}

export default handleActions({
  [GET_ANSWER] (state, action) {
    return {...action.payload}
  },
  [FAV_ANSWER] (state, action) {
    return {...action.payload}
  },

}, initialState)
