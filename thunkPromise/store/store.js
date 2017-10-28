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
 * redux-logger 简单的打印出最后触发的 action 每一次开始和结束的信息和 state 的状态
 */
store.dispatch = (action) => {
	console.info('start', action.type, getState())
	dispatch(action)
	console.info('end', action.type, getState())
}

const dispatch1 = store.dispatch
/**
 * dispatch 添加 thunk 处理
 * 如果参数是函数, 则传入 dispatch 函数供函数内部逻辑调用
 * @param  {any} arg
 */
store.dispatch = arg => {
	if (typeof arg === 'function') return arg(store.dispatch, getState)

	dispatch1(arg)
}

const dispatch2 = store.dispatch
/**
 * 添加 promise 处理函数
 * 如果参数的 payload 属性是 promise 对象, 则在 promise 的各个阶段, 触发不同的事件完成异步逻辑
 * @param  {any} action
 */
store.dispatch = action => {
	/**
	 * 对 action 的 payload 为 promise 类型的事件做特殊处理
	 * @param  {type} isPromise
	 */
	if (isPromise(action.payload)) {
		const { type, payload, params } = action
		/**
		 * 首先触发 _PENDDING type 表示异步事件开始
		 * @type {object}
		 */
		dispatch2({
			type: `${type}_PENDDING`,
			params
		})

		/**
		 * promsie 结束后根据是否成功分别触发 _SUCCESS 或者 _ERROR type 事件
		 * @type {object}
		 */
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
