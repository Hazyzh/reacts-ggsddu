import { combineReducers } from 'redux'

import home from './homeReducer.js'

const appStore = combineReducers({
	home
})

export default appStore
