import React from 'react'
import ReactDOM from 'react-dom'

export default (App) => {
  const rootContainer = document.getElementById('root-container');
  ReactDOM.render(<App />, rootContainer);
}
