### 实例回顾

 ![effect](https://hazyzh.oss-cn-shenzhen.aliyuncs.com/imgs/redux/effect.gif)

假如按钮和界面不在同一组件, 经常用 `redux` 去实现上面功能, 可以想象到如下代码

```javascript
	...
	const Test = ({ colorTheme, authorName }) =>
		<div
			className='texts'
			style={{color: colorTheme}} >
			Hello World - { authorName }
		</div>

	const mapStateToProps = state => ({
		colorTheme: state.colorTheme,
		authorName: state.authorName
	})

	...

```

用过 `mapStateToProps` 从顶层拿到属性然后展示, 在另一个组建通过 `mapDispatchToProps` 去触发 `action` 改变 `state`, 那么我们如何自己实现 `redux` 的功能呢

### redux 属性分析

关于我们常用到的内容, 首先我们要考虑 `createStore` 方法, 使得可以创建出来我们后面要用到的 `store` , 可以接受 `action` 去处理改变 `state`, 并且去触发其他事件，比如组建渲染。 `Provider` 组建，可以传入一个 `store` 向下分发我们的 `store`,使得子组建可以获取到我们 `store` 内的属性和方法。一个 `connect` 方法，使得子组建可以获取到 `store` 里面的内容, 并根据 `state` 改变及时刷新渲染。

### 动手实现 redux

#### 实现 createStore


```javascript

	export default reducer => {
		let state = null
		let listeners = []

		const subscribe = listener => {
			listeners.push(listener)
			return () => {
				listeners = listeners.filter(d => d !== listener)
			}
		}

		const getState = () => state

		const dispatch = action => {
			state = reducer(state, action)
			listeners.forEach(listener => listener())
		}

		dispatch()

		return { getState, dispatch, subscribe }
	}

```

这个模块直接 `export` 创建 `store` 的函数,考虑到要暴露出去的三个函数, 我们用函数内部的变量 `state` 来存储我们的数据, `getState` 时候直接返回当前的值就可以了, 同样用内部变量 `listeners` 来存储订阅者, 订阅者则由 `dispatch` 函数添加, 返回取消订阅的函数。 `dispatch` 则根据 `action` 返回新的 `state` 同时通知订阅者执行相关逻辑。最后返回包含这三个函数的对象。改对象接受 `reducer` 作为参数, 内部执行一次 `dispatch` 则是为了初始化 `state`

#### 实现 reducer

```javascript

	const initState = {
		...
	}

	export default (state, action) => {

		if (!state) return initState

		switch (action.type) {
			...
		}
	}

```

关于 `reducer` 则简单的实现了根据不同的 `action`, 返回不同的 `state`, 只是刚开始判断了如果没有 `state`, 即初始化时候返回设置好的初始化值。

#### 实现 Provider

```javascrpit

	class Provider extends Component {
		getChildContext () {
			return {
				store: this.props.store
			}
		}

		...
	}

```

这里必须提一下 `react` 的 `context` 这个属性, 可以让我们不通过 `props` 去获取到上层组建的属性, 不过关于写法却有一些特殊的规定而且在后面的版本可能被移除, 具体信息可以参考[Context](https://reactjs.org/docs/context.html). 我们用 `context` 把创建的 `store` 存入顶层组建中, 这样就可以在后序组建中去获取到相关内容了。

#### 实现connect

```javascript

	const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
		class InnerComponent extends Component{
			constructor (props, context) {
				super(props)
				const { getState, dispatch, subscribe } = context.store

				this.state = {
					...props,
					...mapStateToProps(getState()),
					...mapDispatchToProps(dispatch)
				}

				subscribe(() => this._updateStore())
			}

			_updateStore  = () => {
				const { getState, dispatch } = this.context.store

				const allProps = {
					...this.props,
					...mapStateToProps(getState()),
					...mapDispatchToProps(dispatch)
				}

				this.setState({ ...allProps })
			}

			render () {
				return (
					<WrappedComponent
						{...this.state} />
				)
			}
		}

		InnerComponent.contextTypes = { store: PropTypes.object }

		return InnerComponent
	}

```

高阶组件这个概念我们在官网上也可以看的到 [Higher-Order Components](https://reactjs.org/docs/context.html), 简单理解就是传入一个组件返回一个新的组件, 它内部做什么事情则有你自己定义, 我们这里实现 `connect`, 则也算是高阶函数返回一个高阶组件, 接受两个函数作为参数, `mapStateToProps ` 和 `mapDispatchToProps` 看形参的名字就很熟悉, 我们分别传入当前的 `state` 和 `dispatch` 函数, 得到的返回值则通过 `props` 传递给入参函数, 内部函数则通过 `context` 获取到顶部的 `store`, 同时用 `subscribe`
 添加订阅者每次更新 `state` 时候则重新渲染当前组件。

 ![height-order-component.](https://hazyzh.oss-cn-shenzhen.aliyuncs.com/imgs/height-order-component.png)


至此我们的简易得逻辑已经实现, 代码github上有【[reacts-ggsddu](https://github.com/Hazyzh/reacts-ggsddu)】, 大家可以下载本地运行感受一下

### 参考

 - [React.js 小书](http://huziketang.com/books/react/)
