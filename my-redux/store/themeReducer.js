const initState = {
	colorTheme: '#11EEEE',
	authorName: 'hazy'
}

export default (state, action) => {
	// 初始化，没 state 时候返回初始值
	if (!state) return initState

	switch (action.type) {
		case 'CHANGE_COLOR':
			return {
				...state,
				colorTheme: action.color
			}
		case 'CHANGE_NAME':
			return {
				...state,
				authorName: action.name
			}
		default:
			return state
	}
}
