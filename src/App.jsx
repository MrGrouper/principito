import React, { useState, useRef } from 'react'
import Convert from './components/Convert'
import LoadBook from './components/Load'


function App() {
  
  
  const [text, setUsername] = useState('hello world')
  const [language, setLanguage] = useState('es')
  const input = useRef(null)
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY
  // const apiKey = 'AIzaSyD4hE53CpUcoqbrvKIqR7unBm84HaUrbGo'

  console.log(apiKey)

  const handleClick=(e)=>{
    console.log(e.target.innerText)
}

  const test = () => {
    console.log(input.current)

  }

  return (
    
    <div>
      <Convert
      text = {text}
      language={language}
      />
    <div>
      <LoadBook
      onClick={test} />
    </div>
    </div>
  )
  }

export default App

