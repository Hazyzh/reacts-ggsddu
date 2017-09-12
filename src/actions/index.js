let nextTodoId = 0

/**
 * addTodo action
 * @param {string} text todo name
 */
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

/**
 * setVisibilityFilter action
 * @param {string} filter the type of filter
 */
export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

/**
 * toggle todo status
 * @param  {number} toggleTodo the todo's id
 */
export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
})
