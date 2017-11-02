import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import store from './store'

import Home from './containers/Home.js'

class MiddleWare extends Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<Home />
				</div>
			</Provider>
		)
	}
}

export default MiddleWare
