/**
 * todos reducer
 * @param  {Array}  [state=[]] initstate
 * @param  {Object} action     action
 * @return {Array}             same as the initstate
 */
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      var { id, text } = action
      return [...state, { id, text, completed: false }]
    case 'TOGGLE_TODO':
      var { id } = action
      return state.map(d => d.id == id ? { ...d, completed: !d.completed } : d)
    default:
      return state
  }
}

export default todos
