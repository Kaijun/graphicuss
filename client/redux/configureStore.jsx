import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { logger } from './middleware'
import rootReducer from './rootReducer'

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    logger, promiseMiddleware, routerMiddleware(browserHistory)
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextReducer = require('./rootReducer')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
