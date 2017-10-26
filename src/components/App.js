import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import CountInfo from '../containers/CountNumber'

import UserShow from '../containers/UserShow'
import Test from '../containers/Test'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <CountInfo />
    <UserShow />
    <Test />
  </div>
)

export default App
