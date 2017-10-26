import React from 'react'
import connect from '../heigherOrderComponents/connect.js'

const Test = ({ colorTheme, authorName }) =>
	<div
		className='texts'
		style={{color: colorTheme}} >
		Hello World - { authorName }
	</div>

const mapStateToProps = state => ({
	colorTheme: state.colorTheme,
	authorName: state.authorName
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Test)
