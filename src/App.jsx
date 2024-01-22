import React, { useState, useRef } from 'react'
import Convert from './components/Convert.jsx'
import LoadBook from './components/Load'


function App() {
  
  
  const [text, setUsername] = useState('hello world')
  const [language, setLanguage] = useState('es')
  const input = useRef(null)



  return (
    
    <div>
      <Convert
      text = {text}
      language={language}
      />
    <div>
      <LoadBook/>
    </div>
    </div>
  )
  }

export default App

