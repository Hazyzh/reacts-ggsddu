import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Text extends Component {

	onSomeButtonClicked = () => {
		const { userId, dispatch } = this.props
		dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
	}

	render() {
		const { userId, wage, loading } = this.props
		return(
			<div>
				{userId} :
				<span>{ loading ? 'loading' : wage}</span>
				<hr />
				<button
					onClick={this.onSomeButtonClicked}>
					fetching
				</button>
			</div>
		)
	}
}

Text.propTypes = {
	userId: PropTypes.string.isRequired,
	wage: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,

	dispatch: PropTypes.func.isRequired,
}


export default Text
