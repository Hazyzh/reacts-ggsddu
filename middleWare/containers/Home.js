import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import Home from '../components/Home'

import { addNum, getResourceLists } from '../actions/index.js'

const mapStateToProps = state => ({
	name: state.userInfo.name,
	num: state.userInfo.num,
	dataList: state.home,
	loading: state.uiState.ADD_LIST
})

const mapDispatchToProps = dispatch => ({
	addFunc: bindActionCreators(addNum, dispatch),
	getDataFunc: bindActionCreators(getResourceLists, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)
