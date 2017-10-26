import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
/**
 * base on redux-promise-middleware
 * add some my func
 * just for auto change redux viewState
 */
import promiseMiddleware from './middleware/promise_middleware'
import thunk from 'redux-thunk'

// logger
const logger = createLogger({
  collapsed: true,
  diff: true
})

// promise middlerware
const promiseWare = promiseMiddleware({
  promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
})

import rootReducer from '../reducers/index.js'

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    promiseWare,
    logger
  ),
)

export default store
