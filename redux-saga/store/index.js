import { applyMiddleware, createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

const logger = createLogger({
	diff: true,
	collapsed: true
})
import thunk from 'redux-thunk'

const sagaMiddleware = createSagaMiddleware()

import rootReducer from '../reducers/index.js'
import mySaga from '../sagas/home.js'

let store = createStore(
	rootReducer,
	applyMiddleware(
		sagaMiddleware,
		logger
	),
)

sagaMiddleware.run(mySaga)

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('../reducers', () => {
		const nextRootReducer = require('../reducers/index.js');
		store.replaceReducer(nextRootReducer);
	});
}

export default store
