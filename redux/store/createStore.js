/**
 * createStore 函数
 * @param  {func} reducer
 * @return {object}         返回暴露出去的三个方法 【getState, dispatch, subscribe】
 */
export default reducer => {
	let state = null
	let listeners = []

	/**
	 * subscribe 添加监听者函数
	 * @param  {func} listener 监听的函数
	 * @return {func}          取消这个监听的函数
	 */
	const subscribe = listener => {
		listeners.push(listener)
		return () => {
			listeners = listeners.filter(d => d !== listener)
		}
	}

	/**
	 * 返回当前的state
	 * @return {object} 当前的state
	 */
	const getState = () => state

	/**
	 * dispatch 函数 改变state, 同时触发监听的 listener
	 * @param  {object} action
	 */
	const dispatch = action => {
		state = reducer(state, action)
		listeners.forEach(listener => listener())
	}

	// 初始化state
	dispatch()

	return { getState, dispatch, subscribe }
}
