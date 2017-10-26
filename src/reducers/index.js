import { combineReducers } from 'redux'

import todos from './todos'
import userInfo from './userList'
import visibilityFilter from './visibilityFilter'
import uiState from './uiState.js'

const appStore = combineReducers({
  todos,
  visibilityFilter,
  userInfo,
  uiState
})

export default appStore
