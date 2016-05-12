import {createAction, handleActions } from 'redux-actions'

const searchCourseRequest = (courseCode) => fetch(`/api/search/course/${courseCode}`)

const SEARCH_COURSE = 'search course'
// Actions
const searchCourse = createAction(SEARCH_COURSE, (data) => searchCourseRequest(data))
// Exposed Actions
export const actions = {
  searchCourse,
}

// Reducers
const initialState = {}

export default handleActions({
  [SEARCH_COURSE] (state, action) {
    return {...action.payload}
  },

}, initialState)
