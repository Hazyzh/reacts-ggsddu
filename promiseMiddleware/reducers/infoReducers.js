const initState = {
	name: 'hazyzh',
	num: 11
}

/**
 * todos reducer
 * @param  {Array}  [state=[]] initstate
 * @param  {Object} action     action
 * @return {object}             same as the initstate
 */
const inofoReducers = (state = initState, action) => {
	switch (action.type) {
		case 'ADD_NUM':
		{
			return {...state, num: state.num + 1}
		}
		default:
			return state
	}
}

export default inofoReducers
