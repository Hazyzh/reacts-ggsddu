### 异步处理

我们使用 `redux` 处理数据流时候, 一个比较令人头疼的问题就是关于异步操作。`Action` 发出以后，过一段时间再执行 `Reducer`，这就是异步。在哪个阶段处理异步, `Reducer` 作为一个纯函数, 不适合承担此类功能, 理论上也承担不了, `Action` 存放一个对象, 作为消息的载体自己更不能进行异步操作。想一想就发现可以在 `dispatch` 这个发送 `Action` 的方法上做文章。如果我们能在异步操作的不同阶段发送不同的 `Action` 我们就可以完成异步操作了。

![redux-promise](http://hazyzh.oss-cn-shenzhen.aliyuncs.com/imgs/redux/thunk-promise.png)

### 改造 dispatch

基于我们之前实现的简单 `redux`, 对于它的 `dispatch` 函数进行处理。使它具有处理我们异步逻辑的能力。

有时候看源码总能感觉到作者对代码逻辑处理的很优雅, 以及对于功能的可扩展性把握的很好，但是往往这些优美的代码，理解起来需要很多其他方面的知识基础, 这也是很多人看源码困难很大的原因。我们这里对与 `redux` 中间件的处理在后续再去讨论, 这里我们就以一种比较蠢的方法简单粗暴的实现我们想要的功能

#### 加入 Thunk 能力

```javascript

	...
	const dispatch1 = store.dispatch
	store.dispatch = arg => {
		if (typeof arg === 'function') return arg(store.dispatch, getState)
		dispatch1(arg)
	}
	...

```

这里逻辑异常简单, 先把原来的 `dispatch` 函数存储起来, 判断 `dispatch` 传入的参数类型, 如果参数类型为 `function` 则执行改函数并返回, 传入 `store` 的 `dispatch` 和 `getState` 作为参数, 使得 `dispatch` 具有处理函数参数的能力。

#### 加入处理 Promise 能力

其实上面的 `thunk` 我们已经有了处理异步的能力, 但是每次我们要自己去手动触发三个 `action`, 工作量还是很大的。现在 `ajax` 很多都会包装为 `promise` 对象, 因此我们可以对与 `dispatch` 增加一层判断, 使得它具有处理具有 `promise` 属性的 `action` 的能力。

```javascript

	...
	const dispatch2 = store.dispatch

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
	...

```

我们规定 `action` 要把 `promise` 对象放入 `payload` 属性中。当接收到 `payload` 属性为 `promise` 对象的 `action` 时候, 我们这里硬编码直接触发该 `type` 加 `_PENDDING` 事件。等到该 `promise` 状态改变后, 我们根据它成功与否分别触发 `_SUCCESS` 和 `_ERROR` 事件, 这样我们就可以把异步逻辑包装为 `promise` 对象放在 `action` 中, 然后我们在 `reducer` 中分别处理这几种类型的事件即可。

### 测试和思考

我们现在可以在项目([reacts-ggsddu](https://github.com/Hazyzh/reacts-ggsddu))中分别去 `dispatch` 一个函数和一个带有 `promise` 对象的 `action` 可以看到分别的请求效果。 一个简易的异步处理方法已经实现了。

但是反观对 `dispatch` 的改造没有什么统一性, 代码很难维护和扩展, redux 是可以配置中间件来扩展配置的。我们后面再去研究。
