import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Checkbox from 'rc-checkbox'

const Boxs = ({dataList, changeFunc, total1, total2, words, onWordsChange}) =>
	<div style={{padding: '20px', width: '1100px', margin: 'auto'}}>
		{dataList.map(d =>
			<label key={d.name}>
				<Checkbox
					onChange={e => changeFunc(d.name)}
					checked={d.checked} />
				{' ' + d.name + ' : ' + d.price.toFixed(2)}
			</label>
		)}
		<hr />
		<div className='my-input'>
			<input value={words} onChange={e => onWordsChange(e.target.value)} />
		</div>
		<hr />
		<h3>
			total1 : {total1.toFixed(2)}
		</h3>
		<h3>
			total2 : {total2.toFixed(2)}
		</h3>
	</div>

Boxs.propTypes = {
	dataList: PropTypes.array.isRequired,
	total1: PropTypes.number.isRequired,
	total2: PropTypes.number.isRequired,
	words: PropTypes.string.isRequired,
	changeFunc: PropTypes.func.isRequired,
	onWordsChange: PropTypes.func.isRequired,
}

export default Boxs
