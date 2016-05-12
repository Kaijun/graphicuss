import {createAction, handleActions } from 'redux-actions'

const getCourseRequest = (courseId) => fetch(`/api/courses/${courseId}`)

const deleteCourseRequest = (courseId) => fetch(`/api/courses/${courseId}`, {
  method: 'delete'
})

const editCourseRequest = (courseId) => fetch(`/api/courses/${courseId}`, {
  method: 'put'
})

const GET_COURSE = 'get course'
const EDIT_COURSE = 'edit course'
const DELETE_COURSE = 'delete course'
// Actions
const getCourse = createAction(GET_COURSE, (data) => getCourseRequest(data))
const editCourse = createAction(EDIT_COURSE, (data) => editCourseRequest(data))
const deleteCourse = createAction(DELETE_COURSE, (data) => deleteCourseRequest(data))

// Exposed Actions
export const actions = {
  getCourse,
  editCourse,
  deleteCourse,
}

// Reducers
const initialState = {}

export default handleActions({
  [GET_COURSE] (state, action) {
    return {...action.payload}
  },
  [EDIT_COURSE] (state, action) {
    return {...action.payload}
  },
  [DELETE_COURSE] (state, action) {
    return {...action.payload}
  },

}, initialState)
