import React, { Component } from 'react'
import { Provider } from 'react-redux'
import MyApp from '../components/App.js'
import store from '../store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    )
  }
}

export default App
