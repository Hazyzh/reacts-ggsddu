import React from 'react'
import PropTypes from 'prop-types'

const Home = ({ name, num, dataList, loading, addFunc, getDataFunc }) =>
	<div>
		<p>name: {name}</p>
		<p>num: {num}</p>
		<p>
			<button
				onClick={addFunc} >
				add number +
			</button>

			<button
				disabled={loading}
				onClick={getDataFunc}
				className={ loading ? 'loadingBtn' : ''} >
				{ !loading ? 'Get Data' : 'Loading Data...' }
			</button>
		</p>
		<ul>
			{
				dataList.map(d =>
					<li key={d}>{d}</li>
				)
			}
		</ul>
	</div>

Home.propTypes = {
	name: PropTypes.string.isRequired,
	num: PropTypes.number.isRequired,
	dataList: PropTypes.array.isRequired,

	loading: PropTypes.any,

	addFunc: PropTypes.func.isRequired,
	getDataFunc: PropTypes.func.isRequired,
}

export default Home
