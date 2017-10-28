import React from 'react'
import connect from '../heigherOrderComponents/connect.js'

const TestPromise = ({ dataLists, fetchState }) =>
	<div>
		<button
			className={ fetchState ? 'loadingBtn' : ''}
			disabled={true} >
			{ fetchState ? 'Get Data' : 'Loading Data' }
		</button>
		<ul>
			hello world
		</ul>
	</div>


let promise = new Promise((r, j) => {
	setTimeout(() => r(), 2000)
})


const mapStateToProps = state => ({
	dataLists: state.dataLists,
	fetchState: state.fetchState
})

const mapDispatchToProps = dispatch => ({
	loadingData: () => dispatch({
		type: ''
	}),
})

export default connect(mapStateToProps, mapDispatchToProps)(TestPromise)
