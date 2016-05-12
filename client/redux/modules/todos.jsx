import {createAction, handleActions } from 'redux-actions'

const ADD_TODO = 'add todo'
const DELETE_TODO = 'delete todo'
const EDIT_TODO = 'edit todo'
const COMPLETE_TODO = 'complete todo'
const COMPLETE_ALL = 'complete all'
const CLEAR_COMPLETE = 'clear complete'

// Actions
const addTodo = createAction(ADD_TODO)
const deleteTodo = createAction(DELETE_TODO)
const editTodo = createAction(EDIT_TODO)
const completeTodo = createAction(COMPLETE_TODO)
const completeAll = createAction(COMPLETE_ALL)
const clearCompleted = createAction(CLEAR_COMPLETE)

// Exposed Actions
export const actions = {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted,
}

// Reducers
const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}]

export default handleActions({
  [ADD_TODO] (state, action) {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.payload
    }, ...state]
  },

  [DELETE_TODO] (state, action) {
    return state.filter(todo => todo.id !== action.payload )
  },

  [EDIT_TODO] (state, action) {
    return state.map(todo => {
      return todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo
    })
  },

  [COMPLETE_TODO] (state, action) {
    return state.map(todo => {
      return todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    })
  },

  [COMPLETE_ALL] (state, action) {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => {
      return {
        ...todo,
        completed: !areAllMarked
      }
    })
  },

  [CLEAR_COMPLETE] (state, action) {
    return state.filter(todo => todo.completed === false)
  }
}, initialState)
