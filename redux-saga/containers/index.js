import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import Text from '../componnets/index.js'

const mapStateToProps = ({home}) => ({
	wage: home.wage,
	loading: home.loading,
	userId: 'hazyzh'
})

const mapDispatchToProps = dispatch => ({
	dispatch
})


export default connect(mapStateToProps, mapDispatchToProps)(Text)
