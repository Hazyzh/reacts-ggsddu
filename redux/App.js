import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Provider from './heigherOrderComponents/Provider.js'
import Test from './components/Test.js'
import Button from './components/Button.js'

import createStore from './store/createStore.js'
import reducers from './store/themeReducer.js'

const store = createStore(reducers)

class ReduxComponent extends Component {
	render () {
		return (
			<Provider store={store}>
				<div>
					<Test />
					<hr />
					<Button />
				</div>
			</Provider>
		)

	}
}

export default ReduxComponent
