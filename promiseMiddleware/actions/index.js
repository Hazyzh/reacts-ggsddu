/**
 * 添加数子测试logger
 */
export const addNum = () => ({
	type: 'ADD_NUM'
})

const getPromise = () => new Promise((r, j) => {
	setTimeout(() => r([1, 2, 3, 4]), 2000)
})

/**
 * 模拟发送异步请求
 */
export const getResourceLists = () => ({
	type: 'ADD_LIST',
	payload: {
		promise: getPromise()
	}
})
