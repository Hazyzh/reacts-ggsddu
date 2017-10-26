import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    // console.log(todos, visibilityFilter)

    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)

export const getPercent = createSelector(
  [getTodos, getVisibleTodos],
  (todos, showTodos) => {
    return todos.length > 0 ? ((showTodos.length / todos.length) * 100).toFixed(2) : '暂无数据'
  }
)
