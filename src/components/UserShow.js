import React from 'react'
import PropTypes from 'prop-types'

const UserShow = ({ name, toggle, onUserClick }) => (
  <h3
    onClick={onUserClick}
    style={{color: toggle ? '#333' : 'red'}}>
    {name}
  </h3>
)


UserShow.propTypes = {
  name: PropTypes.string.isRequired,
  toggle: PropTypes.bool.isRequired,
  onUserClick: PropTypes.func.isRequired
}

export default UserShow
