
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import todos from './modules/todos'
import user from './modules/user'
import courses from './modules/courses'
import course from './modules/course'
import searchCourse from './modules/searchCourse'
import questions from './modules/questions'
import question from './modules/question'
import answers from './modules/answers'

export default combineReducers({
  routing,
  todos,
  user,
  courses,
  course,
  searchCourse,
  questions,
  question,
  answers,
})
