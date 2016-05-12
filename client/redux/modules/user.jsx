import {createAction, handleActions } from 'redux-actions'

const loginRequest = (data) => {
  return fetch.postForm('/api/auth/login', data)
}
const signupRequest = (data) => {
  return fetch.postForm('/api/auth/signup', data)
}
const isLoggedInRequest = () => fetch('/api/auth/is-logged-in')
const logoutRequest = () => fetch('/api/auth/logout')

const SIGN_UP = 'sign up'
const LOG_IN = 'log in'
const LOG_OUT = 'log out'
const IS_LOG_IN = 'is log in'

const signUp = createAction(SIGN_UP, data => signupRequest(data))
const login = createAction(LOG_IN, data => loginRequest(data))
const logout = createAction(LOG_OUT, () => logoutRequest())
const isLogin = createAction(IS_LOG_IN, () => isLoggedInRequest())

export const actions = {
  signUp,
  login,
  logout,
  isLogin,
}

const initialState = {}

export default handleActions({
  [SIGN_UP] (state, action){
    if(action.payload.error) return initialState
    return {...action.payload}
  },
  [LOG_IN] (state, action){
    if(action.payload.error) return initialState
    return  {...action.payload}
  },
  [LOG_OUT] (state, action){
    if(action.payload.error) return initialState
    return {}
  },
  [IS_LOG_IN] (state, action){
    if(action.payload.error) return initialState
    return {...action.payload}
  },
}, initialState)
