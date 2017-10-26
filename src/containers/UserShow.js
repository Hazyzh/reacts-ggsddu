import { connect } from 'react-redux'
import { toggleUser, testChunk } from '../actions'
import UserShow from '../components/UserShow'

const mapStateToProps = state => {
  return {
    name:  state.userInfo.name,
    toggle: state.userInfo.toggle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUserClick: () => {
      dispatch(toggleUser())
      dispatch(testChunk())
    }
  }
}

const UserShowInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShow)

export default UserShowInfo
