import React from 'react'
import './App.scss'
import Header from './Components/Header'
import routes from './routes'


const App = () => {
  return (
    <div className='App'>
      <Header />
      {routes}
    </div>
  )
}
export default App