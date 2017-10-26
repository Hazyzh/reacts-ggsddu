import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * 顶层 provier 组建 接受 store 参数
 */
class Provider extends Component {
	getChildContext () {
		return {
			store: this.props.store
		}
	}

	render () {
		return (
			<div>
				{ this.props.children }
			</div>
		)
	}
}

Provider.childContextTypes = {
	store: PropTypes.object
}

Provider.propTypes = {
	store: PropTypes.object.isRequired
}

export default Provider
