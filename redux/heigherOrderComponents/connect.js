import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * connect函数
 * @param  {func} mapStateToProps
 * @param  {func} mapDispatchToProps
 * @return {func}                    返回一个函数接受一个node作为参数
 */
const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
	class InnerComponent extends Component{
		constructor (props, context) {
			super(props)
			const { getState, dispatch, subscribe } = context.store

			this.state = {
				...props,
				...mapStateToProps(getState()),
				...mapDispatchToProps(dispatch)
			}
			// 加入观察者队列 每次store更新时候执行更新函数
			subscribe(() => this._updateStore())
		}
		
		/**
		 * 更新内部状态值
		 */
		_updateStore  = () => {
			const { getState, dispatch } = this.context.store

			const allProps = {
				...this.props,
				...mapStateToProps(getState()),
				...mapDispatchToProps(dispatch)
			}

			this.setState({ ...allProps })
		}

		render () {
			return (
				<WrappedComponent
					{...this.state} />
			)
		}
	}

	InnerComponent.contextTypes = { store: PropTypes.object }

	return InnerComponent
}

export default connect
