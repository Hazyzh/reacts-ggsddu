import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Provider from './heigherOrderComponents/Provider.js'
import store from './store/store.js'

import ThunkCount from './components/ThunkCount.js'
import TestPromise from './components/TestPromise.js'


class ThunkPromise extends Component {
	render () {
		return (
			<Provider store={store}>
				<div>
					<ThunkCount />
					<hr />
					<TestPromise />
				</div>
			</Provider>
		)

	}
}

export default ThunkPromise
