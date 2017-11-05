import { STATEMACHINE } from '../store/middleware/promise_middleware.js'

/**
 * this is for store ui state, it will change automatic after the async function
 * dispatch.
 * @param  {Object} [state={}]  a store stored the action uiState, the key is action type and the value is loading state.
 * @param  {[type]} action
 * @return {[type]}            newstate
 */
const uiStateStore = (state = {}, action) => {
	switch (action.type) {
		case STATEMACHINE: {
			let { actionType, isFetching } = action
			return {
				...state,
				[actionType]: isFetching
			}
		}
		default:
			return state
	}
}

export default uiStateStore
