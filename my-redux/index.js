import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App.js'
import './index.less'

ReactDOM.render(
	<App/>,
	document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./App.js', () => {
		const NextApp = require('./App.js').default;
		ReactDOM.render(
			<AppContainer>
				<NextApp/>
			</AppContainer>,
			document.getElementById('root')
		)
	})
}
