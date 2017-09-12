import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo.js'

const TodoLists = ({ todoList = [], onTodoClick }) => (
    <ul>
      {
        todoList.map(d => (
          <Todo
            key={d.id}
            text={d.text}
            completed={d.completed}
            onClick={ () => onTodoClick(d.id) }/>
        ))
      }
    </ul>
  )


TodoLists.propTypes = {
  todoList: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoLists
