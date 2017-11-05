/**
 * home reducer
 * @param  {Array}  [state=[]] initstate
 * @param  {Object} action     action
 * @return {Array}             same as the initstate
 */
const home = (state = [], action) => {
	switch (action.type) {
		case 'ADD_LIST_PENDING':
			return []
		case 'ADD_LIST_FULFILLED':
			return action.payload
		case 'ADD_LIST_REJECTED':
			return state
		default:
			return state
	}
}

export default home
