### 从 `compose` 函数开始

在函数式编程当中有一个很重要的概念就是函数组合，实际上就是把处理数据的函数像管道一样连接起来，然后让数据穿过管道得到最终的结果。

```javascript

	const add = x => x + 2  // 加
	const minus = x => x - 2	// 减
	const mul = x => x * 2	// 乘
	const div = x => x / 2  // 除

	minus(mul(add(3))) // => 8
```

如果我想对一个参数执行上面的 `add, mul, minus` 函数, 然后得到返回值, 上面的写法可读性就会很差, 这时候我们就需要一个 `compose` 函数, 它可以接受上面的函数作为参数, 然后返回一个函数, 返回的这个函数也可以达成上面的效果, 如下

```javascript

	...
	const myOperate1 = compose(minus, mul, add) // 加 => 乘 => 减
	const myOperate2 = compose(div, add, mul) // 乘 => 加 => 除

	myOperate1(3) // => 8
	myOperate2(3) // => 4

```

关于 `compose` 很多函数编程库里面都有实现, 这里我们不考虑一些特殊情况, 对于这个需求自己简单实现一下大概类似这样

```javascript
	const compose = (...args) => args.reduce( (pre, d) => num => pre(d(num)) )
```

在 [`ScriptOJ`](https://scriptoj.com/problems/27) (*一个关于 Web 前端开发评测系统的网站*) 上也有这样一道题, 可以自己去测试下。

### redux 的中间件

我们之前有去[手动实现 `redux` 异步](https://github.com/Hazyzh/reacts-ggsddu/blob/master/docs/thunkPriomise.md), 其实也算有一些简单的中间件, 最终目的就是改造了 `store` 的 `dispatch` 函数。但是当时自己纯粹为了实现目的，代码可读性和延展性几乎没有。用过 `nodejs` 的 `koa` 框架的一定知道中间件这个概念。`redux` 这里也是使用了中间件的思想, 用来增强 `redux` 的 `dispatch` 函数。

![redux-middleware](https://hazyzh.oss-cn-shenzhen.aliyuncs.com/imgs/redux/%E4%B8%9C%E8%8E%9E%E4%BA%8B%E4%B8%9A%E9%83%A8%E5%82%AC%E8%B4%B9%E6%95%B0%E6%8D%AE.png)

#### redux 规定的 middleware 格式

```javascript

// redux 中间件 middleware 的格式
export default store => next => action => {
	console.log('dispatch: ', action)
	next()
	console.log('finish: ', action)
}

```

上面的代码我们可以感受很多函数编程的思想(*这也是我喜欢 `react` 一个很重要的原因*), 函数编程中有一个重要的概念 `柯里化`, 其实我们之前去实现 `compose` 函数时候细心的同学也能发现, 作为 `compose` 函数的参数, 这些函数应该都只接受一个参数, `redux` 规定的中间件写法是一个链式返回函数的写法, 中间的参数都已经固定了, 也就是我们只能在最后的代码框里书写中间件的业务逻辑, 在这个里面我们可以拿到哪些参数使用呢, 很明显就是上面链式返回函数里的参数。

`action` 我们很容易想到 `dispatch` 函数的参数就叫做 `action`, 但其实这里拿到的 `action` 应该是我们原始的内容经过 `redux` 的 `middleware` 一层一层处理到当前中间件时候的 `action`, 有了 `action` 我们要怎么处理它， 我们最原始的 `dispatch` 函数去哪里了, `store` 和 `next` 又指的是什么呢？带着问题我们继续看他后面是怎么处理的。

#### 中间件各个参数含义

```javascript

// redux 对 middleware 的处理
...
const store = createStore(...args)
let dispatch = store.dispatch
let chain = []

const middlewareAPI = {
	getState: store.getState,
	dispatch: (...args) => dispatch(...args)
}
chain = middlewares.map(middleware => middleware(middlewareAPI))
dispatch = compose(...chain)(store.dispatch)
...

```

这里 `middlewares` 就是我们创建 `store` 时候传入的中间件数组, 这里先是对 `middlewares` `map` 循环传入参数  `middlewareAPI` 得到返回值。 这里`middleware` 传入的第一个参数 `store` 已经找到了, 我们可以在 `store` 上取到 `getState` 和 `dispatch` 这两个函数。那么 `next` 函数又是传入的呢, 这里我们看到了熟悉的 `compose` 函数了, 我们来看看这里 `compose` 函数的实现。


```javascript

// 处理中间件的 compose 函数
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

```

这里的 `funcs` 指的就是上面的 `chain` 数组, 这里多了对于中间件个数的判断, 最后通过 `reduce` 的实现已经和我们开篇讲的非常相似了。这里同样是把这些函数功能叠加起来, `a` 相当于排在前买呢对 `middleware`, `b` 则是靠后的 `middleware` , 可以看到 `a` 执行的参数传入的是 `b(...args)`, 所以对于 `a` 来说它获取到的 `next` 就是经过 `b` 处理过的 `dispatch`。

有时候抽象的东西总是难以理解, 我们这里假设传入中间件一共有三个【我们熟悉的 thunk, promsie 和 logger】, 所以这里执行完效果应该如下

![redux-middleware](https://hazyzh.oss-cn-shenzhen.aliyuncs.com/imgs/redux/redux-middleware.png)

- 对 `logger `  	而言  	**next** --> `dispatch`
- 对 `promise`	而言 	**next** --> `logger 处理` - `dispatch`
- 对 ` thunk `	而且 	**next** --> `promise 处理` - `logger 处理` - `dispatch`

这里注意 `middlewareAPI` 中的 `dispatch` 熟悉并没有简单的就赋值为 `dispatch`, 而是包装成一个函数,当函数调用时去调用 `dispatch`, 而后面 `dispatch` 会被重新赋值, 所以中间件通过参数 `store` 拿到的 `dispatch`的功能应该等同于包装后的 `dispatch`.

`redux-logger` 中有这样一句提示：`Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions`, 希望你把 `logger` 这个中间件作为最后一个参数, 正是因为放在前面的中间件有可能会改变 `action` ,最后这个最贴近原始 `dispatch` 位置的中间件拿到的 `action` 基本都是用户最终想要的实际类型。


### 思考

学习 `react` 的过程中, 对 `函数式编程` 有了新的认识, 让之前很多只停留在了解层面的知识点有了实际应用的地方。感觉很多概念理解起来会比较抽象, 但是仔细研究后又会觉得很优雅。

### 参考

- [redux.js/applyMiddleware](http://redux.js.org/docs/api/applyMiddleware.html)
- [redux middleware 详解](https://segmentfault.com/a/1190000004485808)
