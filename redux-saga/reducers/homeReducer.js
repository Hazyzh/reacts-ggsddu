const initstate = {
	wage: 6000,
	loading: false
}

/**
 * home reducer
 * @param  {object}  [state={}] initstate
 * @param  {Object} action     action
 * @return {object}             same as the initstate
 */
const home = (state = initstate, action) => {
	switch (action.type) {
		case 'USER_FETCH_REQUESTED':
			return {...state, loading: true}
		case 'USER_FETCH_SUCCEEDED':
			var { wage } = action
			return {wage, loading: false}
		case 'USER_FETCH_FAILED':
			return {...state, loading: false}
		default:
			return state
	}
}

export default home
