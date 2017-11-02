/**
 * home reducer
 * @param  {Array}  [state=[]] initstate
 * @param  {Object} action     action
 * @return {Array}             same as the initstate
 */
const home = (state = [], action) => {
	switch (action.type) {
		case 'ADD_LIST_LOADING':
			return []
		case 'ADD_LIST_SUCCESS':
			return action.payload
		case 'ADD_LIST_ERROR':
			return state
		default:
			return state
	}
}

export default home
