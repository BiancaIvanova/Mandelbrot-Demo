import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MandelbrotCanvas from './MandelbrotCanvas'
import { GitHubLink } from './FloatingUI';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MandelbrotCanvas />
      <GitHubLink/>
    </>
  )
}

export default App
