import createStore from './createStore.js'
import reducers from './themeReducer.js'

const store = createStore(reducers)

const isPromise = value => {
	if (value !== null && typeof value === 'object') {
		return value && typeof value.then === 'function'
	}

	return false
}

let { dispatch, getState } = store

store.dispatch = arg => {
	if (typeof arg === 'function') return arg(dispatch, getState)

	dispatch(arg)
}

const dispatch2 = store.dispatch

store.dispatch = action => {
	if (isPromise(action.payload)) {
		const { type, payload, params } = action
		dispatch2({
			type: `${type}_PENDDING`,
			params
		})

		payload.then(
			resolve => {
				dispatch2({
					type: `${type}_SUCCESS`,
					content: resolve,
					params
				})
			},
			reject => {
				dispatch2({
					type: `${type}_ERROR`,
					content: reject,
					params
				})
			}
		)
	} else {
		dispatch2(action)
	}
}

export default store
