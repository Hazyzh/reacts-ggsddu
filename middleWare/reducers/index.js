import { combineReducers } from 'redux'

import home from './homeReducer.js'
import userInfo from './infoReducers.js'
import uiState from './uiState.js'

const appStore = combineReducers({
	home,
	userInfo,
	uiState
})

export default appStore
