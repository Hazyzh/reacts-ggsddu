### reacts-ggsddu

记录或者分享一些关于 `react` 学习路上的心得和体会

---

- [动手实现redux](https://github.com/Hazyzh/reacts-ggsddu/blob/master/docs/my-redux.MD)

	- 利用 `context` 简易的实现了 `redux` 暴露的函数,实现 `redux` 的功能
	- `npm run my-redux` 可以运行测试此功能, 代码在 `my-redux` 目录下

- [thunk-promise 实现异步](https://github.com/Hazyzh/reacts-ggsddu/blob/master/docs/thunkPriomise.md)

	- 基于上面 [ 动手实现redux ], 扩展 `redux` 的 `dispatch` 函数, 使之支持 `thunk` 和 `promise` 参数的 `action`
	- `npm run async-1` 可以运行测试此功能, 代码在 `thunkPromise` 目录下

- [redux-middleware](https://github.com/Hazyzh/reacts-ggsddu/blob/master/docs/middleWare.md)

	- 分析中间件的实现方法
	- 中间件中可以获取到的各个参数的含义, 以及里面参数的区别。

- [redux-promise-middleware 最佳实践](https://github.com/Hazyzh/reacts-ggsddu/blob/master/docs/practice-promiseMiddleware.md)

	- `promise` 中间件简单说明,和实践需求概述。
	- 改变中间件源码,使得自动实现保持简单乐观更新能力。
	- `npm run async-2` 可以运行测试此功能, 代码在 `promiseMiddleware` 目录下

- [记忆化状态reselect的实践与思考](https://github.com/Hazyzh/reacts-ggsddu/blob/master/docs/reselect.md)

	- `reselect` 使用目的和相似思想。
	- 实例中展示 `reselect` 插件的效果。
	- `npm run reselect` 可以运行测试此功能, 代码在 `reselect` 目录下
