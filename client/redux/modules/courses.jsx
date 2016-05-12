import {createAction, handleActions } from 'redux-actions'

const getCoursesRequest = () => fetch('/api/courses/')

const newCourseRequest = (data) => fetch.postJSON('/api/courses/', data)


const GET_COURSES = 'get courses'
const CREATE_COURSE = 'create course'
// Actions
const getCourses = createAction(GET_COURSES, (data) => getCoursesRequest())
const createCourse = createAction(CREATE_COURSE, (data) => newCourseRequest(data))

// Exposed Actions
export const actions = {
  getCourses,
  createCourse,
}

// Reducers
const initialState = []

export default handleActions({
  [GET_COURSES] (state, action) {
    return [...action.payload]
  },
  [CREATE_COURSE] (state, action) {
    return [action.payload, ...state]
  },

}, initialState)
