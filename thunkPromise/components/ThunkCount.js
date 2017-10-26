import React from 'react'
import connect from '../heigherOrderComponents/connect.js'

const ThunkCount = ({ count, addCounts }) =>
	<div className='count-box'>
		<span> ThunkCount: { count } 次 </span>
		<span>
			<button
				onClick={addCounts} >
				thunkCount
			</button>
		</span>
	</div>


const myThunkAction = (dispatch, getState) => {
	let { thunkCount } = getState()

	dispatch({
		type: 'TEST_THUNK',
		count: thunkCount + 1
	})
}


const mapStateToProps = state => ({
	count: state.thunkCount
})

const mapDispatchToProps = dispatch => ({
	addCounts: () => dispatch(myThunkAction)
})

export default connect(mapStateToProps, mapDispatchToProps)(ThunkCount)
