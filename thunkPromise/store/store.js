import createStore from './createStore.js'
import reducers from './themeReducer.js'

const store = createStore(reducers)

const isPromise = value => {
	if (value !== null && typeof value === 'object') {
		return value && typeof value.then === 'function'
	}

	return false
}

let { dispatch, getState } = store

/**
 * dispatch 添加 thunk 处理
 * 如果参数是函数, 则传入 dispatch 函数供函数内部逻辑调用
 * @param  {any} arg
 */
store.dispatch = arg => {
	if (typeof arg === 'function') return arg(dispatch, getState)

	dispatch(arg)
}

const dispatch2 = store.dispatch

/**
 * 添加 promise 处理函数
 * 如果参数的 payload 属性是 promise 对象, 则在 promise 的各个阶段, 触发不同的事件完成异步逻辑
 * @param  {any} action
 */
store.dispatch = action => {
	if (isPromise(action.payload)) {
		const { type, payload, params } = action
		dispatch2({
			type: `${type}_PENDDING`,
			params
		})

		payload.then(
			resolve => {
				dispatch2({
					type: `${type}_SUCCESS`,
					content: resolve,
					params
				})
			},
			reject => {
				dispatch2({
					type: `${type}_ERROR`,
					content: reject,
					params
				})
			}
		)
	} else {
		dispatch2(action)
	}
}

export default store
