import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { getPercent } from '../reselect/todolist.js'
import CountInfo from '../components/CountInfo.js' 

const mapStateToProps = state => {
  return {
    percent: getPercent(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const CountNumber = connect(
  mapStateToProps,
  mapDispatchToProps
)(CountInfo)

export default CountNumber
