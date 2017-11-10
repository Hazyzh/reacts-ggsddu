import React, { Component } from 'react'
import PropTypes from 'prop-types'

import store from './store/index.js'
import { Provider } from 'react-redux'

import Test from './containers/index.js'

class Reselect extends Component {
	render() {
		return (
			<Provider store={store}>
				<Test />
			</Provider>
		)

	}
}

export default Reselect
