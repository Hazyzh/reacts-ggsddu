/**
 * visibilityFliter reducer
 * @param  {String} [state='SHOW_ALL'] the filter type
 * @param  {Object} action             action
 * @return {String}                    same as the initstate
 */
const visibilityFliter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFliter
