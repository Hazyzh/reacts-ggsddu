import React from 'react'
import connect from '../heigherOrderComponents/connect.js'

const colors = ['red', 'green', 'gray', 'blue', 'white']

const Button = ({ changeColorHandler, changeTextHandler }) =>
	<div className='btns' >
		<button
			onClick={() => changeColorHandler( colors[ Math.floor(Math.random() * 5) ] )} >
			Change Color
		</button>

		<button
			onClick={() => changeTextHandler(('hazyzh - ' + (Math.random() * 20).toFixed(2)))} >
			Change Text
		</button>
	</div>

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
	changeColorHandler: color => dispatch({ type: 'CHANGE_COLOR', color: color}),
	changeTextHandler: text => dispatch({ type: 'CHANGE_NAME', name: text}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Button)
