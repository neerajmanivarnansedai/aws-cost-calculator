import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Basic'
import Basic from './Basic'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Basic></Basic>

    </>
  )
}

export default App
