### redux-promise-middleware 概述

我们之前关于中间件已经有做过讨论。关于 `redux` 的中间件,我们常用的一个用来处理异步的中间件为 `redux-promise-middleware` ,相比较 `redux-promise` 它保留了乐观更新的能力。在启用它之后,我们可以触发一个 `payload` 属性为 `promise` 对象的 `action`

```javascript
const foo = () => ({
  type: 'FOO',
  payload: new Promise()
})
```

中间件会立即触发一个 `action`，类型为我们声明的类型加上`_PENDING`(后缀我们可以自己配置).

```javascript
{ type: 'FOO_PENDING' }
```

等 `promise` 对象的状态发生改变(`resolved` 或者 `rejected` ), 中间件会触发另外一个 `action`，并且带着 `promise` 的信息。

```javascript
{
  type: 'FOO_FULFILLED'
  payload: { ... }
}

{
  type: 'FOO_REJECTED'
  payload: { ... }
}
```

### 实现原理

关于它的[源码](https://github.com/pburtchaell/redux-promise-middleware/blob/master/src/index.js), 其实比较容易理解, 就是判断了一下 `action` 的 `payload` 属性
```javascript
if (action.payload) {
   if (!isPromise(action.payload) && !isPromise(action.payload.promise)) {
	 return next(action);
   }
 } else {
   return next(action);
 }
```

如果是 `promise` 对象则理解触发一个代表异步开始的 `action`

```javascript
next({
	type: [type, _PENDING].join(promiseTypeSeparator),
	...(data !== undefined ? { payload: data } : {}),
	...(meta !== undefined ? { meta } : {})
});
```

然后等待这个 `promise` 对象状态改变后,根据成功与否触发不同的 `action` 并且携带这数据或者错误信息。结合作者的注释还是很容易看懂的。

### 实践分析

实践中,几乎每一个异步操作都有必要增加它乐观更新的能力,哪怕是一个简单的 `button`, 在操作中也会需要它有个 `loading` 状态，一方面给用户更好的体验，另一方面也防止了重复请求。

但是为了在 `redux` 中使用这个状态，不可避免的要针对每个异步 `action` 去声明很多变量去维护这个变量的值。如下

```javascript
switch (action.type) {
	case 'MY_ACTION_TYPE_PENDING':
		return {...state, myActionLoading: true}
	case 'MY_ACTION_TYPE_FULFILLED':
		return {...state, xxx,  myActionLoading: false}
	case 'MY_ACTION_TYPE_REJECTED':
		return {...state, myActionLoading: false}
}
```

我们写了很多这种重复的代码去做这种相同的事情, 既然我们每一个 `action` 的 `type` 都是唯一的。为什么不做一个通用的方法去处理这种状态基的维护呢。

假如我们专门声明一个 `reducer` 去处理状态改变的事件。修改 `redux-promise-middleware` 处理过程,当有异步事件开始或者状态改变时,我们除了触发原来的事件外，也触发一个特殊事件的 `action`，它携带当前事件的 `type` 和 `状态` 作为参数, 当接收到这个事件后我们把这个 `reducer` 对应的 `type` 的状态改为参数的的状态。这样我们就可以自动的更新每一个 `action` 目前的状态值了。

```javascript
// reducer 类似如下
// STATEMACHINE 指的是对应特殊事件的 `action's type`
import { STATEMACHINE } from 'redux-promise-middleware'

const uiStateStore = (state = {}, action) => {
	switch (action.type) {
		case STATEMACHINE: {
			let { actionType, isFetching } = action
			return {
				...state,
				[actionType]: isFetching
			}
		}
		default:
			return state
	}
}


<Button
      loading={this.props.isLoading} />

...

const mapStateToProps = state => ({
    ...,
    isLoading: state.uiState.MY_ACTION_TYPE
})

```

### 效果如下

![promise-middleware](https://hazyzh.oss-cn-shenzhen.aliyuncs.com/imgs/redux/WechatIMG42.jpeg)

可以在项目 [`react-ggsddu`](https://github.com/Hazyzh/reacts-ggsddu) 运行 `npm run async-2` 体验。
