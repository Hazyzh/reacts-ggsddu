import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const appStore = combineReducers({
  todos,
  visibilityFilter
})

export default appStore
