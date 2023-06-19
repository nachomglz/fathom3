import React, { useState, useEffect } from 'react'
import './App.css'
import { Header, Navigation } from './components'
import { ThemeContext } from 'styled-components'

function App() {

  const [theme, setTheme] = useState<"light" | "dark">();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', (e) => {
      setTheme(e.matches ? "dark" : "light")
    });
  }, [])

  return (
    <ThemeContext.Provider value={{ color_mode: theme ?? "light" }} >
      <div className="container">
        <Navigation header={<Header />} />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
