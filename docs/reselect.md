### 缓存数据

我们写后端代码的时候, 为了在密集查询时候尽量少的去操作数据库, 一个方法就是在中间插入一个缓存层,当查询的数据可以在缓存中查询到时候就直接用缓存里面的数据,如果数据改变了再去修改缓存里面的数据。

随着前端近些年的飞速发展,前端项目(*特别在spa*)应用中,前端需要储存越来越多的数据内容,就像一个小型的数据库。

对前端而言这些数据我们都是直接存在内存中的, 所以查询对我们来说并不是什么难事, 但是页面上要展示的内容往往是需要基础数据经过复杂计算得到的结果,每次重新计算都会消耗大量的性能。一种方法是我们去建立一些存贮结果变量, 每次原始值发生改变时候我们再去重新计算然后重新赋值。但是我们又要去维护这些新的变量，在代码维护和后期功能迭代时候有可能会给我们带来很大的困扰。但是每次都从新计算却会大量消耗我们计算机的性能。

### 记忆化斐波那契函数

有做过这样一个题目,[斐波那契数列](https://scriptoj.com/problems/102)指的是类似于以下的数列：`1, 1, 2, 3, 5, 8, 13, ....`,也就是第 `n` 个数由数列的前两个相加而来：`f(n) = f(n - 1) + f(n -2)`, 请你完成 `fibonacci` 函数，接受 `n` 作为参数，可以获取数列中第 `n` 个数。测试程序会从按顺序依次获取斐波那契数列中的数，请注意程序不要超时，也不要添加额外的全局变量。

这个题目比较经典也很好理解, 我当时简单的想到一个实现

```javascript
const fibonacci = n =>{
	let [a, b] = [0, 1]
	while(n--){[a, b] = [b, a + b]}
	return a
}
```

看起来似乎没什么问题,但是当我提交答案时候总是提示超时。当时去网上搜索发现还有用 `数学公式和二分矩阵方法` 计算的，当时以为题目是在考察这些还感觉考察的有些偏。后面仔细看看了题目，上面说测试程序会依次获取数列中的数。突然想到我这个方法每一次执行其实都是要从头开始计算一次，但是后面的数其实就是前两次计算结果的和。有没有什么办法可以把前面计算的数存储起来呢。后面想到这样一种实现。

```javascript
const fibonacci = ((memory = {}) => n => {
	if(n < 2) return n
	if(memory[n-2] === undefined){
		memory[n-2] = fibonacci(n-2)
	}
	if(memory[n-1] === undefined){
		memory[n-1] = fibonacci(n-1)
	}
	return memory[n] = memory[n-1] + memory[n-2]
})()
```

这里我们用 `iife` 返回了一个函数。但是它每次执行都会把值存在内部的 `memory` 变量里，我们下次计算新的值这些已经计算过的值就不用子再去计算了。这样就大大节省了计算量。

### Reselect

我们用 `react` 构建日常应用时候, 通常会用 `redux` 来存储数据。我们页面上大部分展示都和 `redux` 中的数据有关，其中一部分是需要经过复杂的计算然后在进行展示。我们知道改变组件的`state`或者组件里用到的 `redux` 里面的值都会重新渲染我们的我们的组件。如果我们页面里的值是经过复杂计算的得到的,每次重新渲染都会消耗大量的性能。能不能每次计算后都把结果缓存起来只有当计算条件发生改变了我们再重新计算呢。 `reselect` 可以帮助我们去实现这个功能。

#### 创建记忆化的选择器

`Reselect` 提供的了个 `createSelector` 函数, 它可以帮助我们创建一个 `记忆化的选择器`, `createSelector` 第一个参数是由数据选择器函数组成的数组作,然后最后一个参数为数据转换器函数它的参数正是前面这些选择器选择到的值。简单的看如下

```javascript
import { createSelector } from 'reselect'

store = {
	a: 1,
	b: 2
}

const getA = store => store.a
const getB = store => store.b

const getSum = createSelector(
	[getA, getB],
	(a, b) => a + b
)

getSum(store) // 3
```
可以看到最后的数据转换函数,它接受的参数就是前面这些数据选择函数选择到的内容,当然这些函数接收到的参数都是最后我们执行 `getSum` 函数时候传入的参数, 有 `getSum` 生产的函数就会具有`记忆`功能,只有当选择器函数的结果发生改变时候，它才会去执行最后的数据转换函数,否则则直接返回之前计算过的值。

#### 实例中应用

假设我们有一组选择框,上面分别罗列了各个商品的名称和价钱,我们需要在底部展示我们当前选择商品的价格总和。这里我们用 `redux` 实现。
我们在 `state` 中放置一个商品数组。类似`list = [{name: 'item1', price: 12, checked: false},...]`,这里我们直接用 `checked` 属性控制商品是否被选中。然后用两种方法去计算当前选中项的价格总和

```javascript
// input-selectors
const getList = state => state.home.list
/**
 * create select by reselect
 * @type {object} state
 */
const getTotal1 = createSelector(
	getList,
	items => {
		console.log('getTotal1 将要计算')
		return items.reduce((acc, item) => acc + (item.checked ? item.price : 0), 0)
	}
)

/**
 * create select smiple
 * @param  {array} items
 * @return {number} total checked value
 */
const getTotal2 = items => {
	console.log('getTotal2 将要计算')
	return items.reduce((acc, item) => acc + (item.checked ? item.price : 0), 0)
}
```

我们通过 `reselect` 创建一个记忆化函数 `getTotal1`。然后自己在简单的写一个计算总和的函数 `getTotal2`。我们在页面里加入一个 `input` 输入框它的值页关联到 `redux` 的 `state` 中。我们可以看到当 `getTotal1` 和 `getTotal2` 执行计算时候分别会 `log` 出相对应的信息。测试实际效果发现


![reselect](http://hazyzh.oss-cn-shenzhen.aliyuncs.com/imgs/redux/reselect.gif)

当我们改变 `list`里面对值时候两个计算都会发生,但是当我们改变无关变量 `input` 的值时候，`reselect` 创造的选择计算器内部的计算就不会发生，这是因为它的数据源对应的列表并没有发生过变化。这样就节省了很大的计算量。

### 小节

实例在项目 [`react-ggsddu`](https://github.com/Hazyzh/reacts-ggsddu) 运行 `npm run reselect` 体验。

`reselect` 还有很多其他的 `api` 以及使用场景，在他的 [文档](https://github.com/reactjs/reselect) 里面已经说的很清楚了。

感觉有时候看有些题目已经算法之类的总感觉这些都是纯粹为了做题，但是后面自己发现很多思想和技巧其实都在这里面。

`every thing think twice`
