const initState = {
	dataLists: [],
	thunkCount: 0,
	fetchState: false
}

export default (state, action) => {
	// 初始化，没 state 时候返回初始值
	if (!state) return initState

	switch (action.type) {
		case 'TEST_THUNK':
			return {
				...state,
				thunkCount: action.count
			}
		case 'FETCH_DATA_PENDDING':
			return {
				...state,
				fetchState: true,
				dataLists: []
			}
		case 'FETCH_DATA_SUCCESS':
			return {
				...state,
				fetchState: false,
				dataLists: action.content
			}
		case 'FETCH_DATA_ERROR':
			return {
				...state,
				fetchState: false,
				dataLists: []
			}
		default:
			return state
	}
}
