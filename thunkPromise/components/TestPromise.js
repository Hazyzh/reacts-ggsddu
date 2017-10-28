import React from 'react'
import connect from '../heigherOrderComponents/connect.js'

const TestPromise = ({ dataLists, fetchState, loadingData }) =>
	<div>
		<button
			className={ fetchState ? 'loadingBtn' : ''}
			disabled={fetchState}
			onClick={loadingData} >
			{ !fetchState ? 'Get Data' : 'Loading Data...' }
		</button>
		<ul>
			{
				dataLists.map((d, i) =>
					<li key={i} className='promise-info'>
						<span>{d.title}</span>
						<span>看过人数: {d.collectCount}</span>
					</li>
				)
			}
		</ul>
	</div>


let getPromise = () => new Promise((r, j) => {
	setTimeout(() => r(
		[
			{title: '肖申克的救赎', collectCount: 1144030},
			{title: '霸王别姬', collectCount: 817929},
			{title: '这个杀手不太冷', collectCount: 1099878},
			{title: '阿甘正传', collectCount: 971194},
			{title: '美丽人生', collectCount: 541530},
		]
	), 2000)
})

const mapStateToProps = state => ({
	dataLists: state.dataLists,
	fetchState: state.fetchState
})

const mapDispatchToProps = dispatch => ({
	loadingData: () => dispatch({
		type: 'FETCH_DATA',
		payload: getPromise()
	}),
})

export default connect(mapStateToProps, mapDispatchToProps)(TestPromise)
