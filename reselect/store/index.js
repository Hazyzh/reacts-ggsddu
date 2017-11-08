import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'

const logger = createLogger({
	diff: true,
	collapsed: true
})
import thunk from 'redux-thunk'


import rootReducer from '../reducers/index.js'

let store = createStore(
	rootReducer,
	applyMiddleware(
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
