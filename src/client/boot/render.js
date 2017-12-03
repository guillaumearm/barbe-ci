import React from 'react'
import ReactDOM from 'react-dom'

const rootContainer = document.getElementById('root-container')

export default (App) => {
  ReactDOM.render(<App />, rootContainer)
}
