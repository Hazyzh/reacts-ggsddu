import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import Box from '../components/index.js'
import { changeFunc, onWordsChange } from '../actions'

import { createSelector } from 'reselect'

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


const mapStateToProps = state => ({
	dataList: state.home.list,
	total1: getTotal1(state),
	total2: getTotal2(state.home.list),
	words: state.home.words
})

const mapDispatchToProps = dispatch => ({
	changeFunc: bindActionCreators(changeFunc, dispatch),
	onWordsChange: bindActionCreators(onWordsChange, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps)(Box)
