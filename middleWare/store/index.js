import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

const logger = createLogger({
	collapsed: true,
	diff: true
})
import thunk from 'redux-thunk'

import promiseMiddleware from './middleware/promise_middleware'
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

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('../reducers', () => {
		const nextRootReducer = require('../reducers/index.js');
		store.replaceReducer(nextRootReducer);
	});
}

export default store
