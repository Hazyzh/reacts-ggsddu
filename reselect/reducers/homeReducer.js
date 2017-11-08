const initstate = {
	list: [
		{name: 'item1', price: 12, checked: false},
		{name: 'item2', price: 13, checked: false},
		{name: 'item3', price: 22, checked: false},
		{name: 'item4', price: 42, checked: false},
		{name: 'item5', price: 32, checked: false},
		{name: 'item6', price: 31, checked: false},
		{name: 'item7', price: 15, checked: false},
		{name: 'item8', price: 17, checked: false},
		{name: 'item9', price: 52, checked: false},
		{name: 'item10', price: 81, checked: false}
	],
	words: ''
}

/**
 * home reducer
 * @param  {object}  [state={}] initstate
 * @param  {Object} action     action
 * @return {object}             same as the initstate
 */
const home = (state = initstate, action) => {
	switch (action.type) {
		case 'CHANGE_CHECKED':
			var { name } = action
			return {...state, list: state.list.map( d => d.name === name ? ({...d, checked: !d.checked}) : ({...d}) )}
		case 'CHANGE_WORDS':
			var { val } = action
			return {...state, words: val}
		default:
			return state
	}
}

export default home
