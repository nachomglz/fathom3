import React, { useState, useEffect } from 'react'
import './App.css'
import { Header, Navigation } from './components'
import { ThemeContext } from 'styled-components'
import AuthContext from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { User } from './utils/types/request'

function App() {
  const [theme, setTheme] = useState<"light" | "dark">();
  const [contextUser, setContextUser] = useState<Omit<User, "password"> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', (e) => {
      setTheme(e.matches ? "dark" : "light")
    });
  }, [])

  const mutateUser = (field: keyof Omit<User, "password">, value: unknown) => {
    setContextUser( prev => ({ ...prev!, [field]: value }))
  }

  return (
    <AuthContext.Provider value={{ mutateUser, user: contextUser }}>
      <ThemeContext.Provider value={{ color_mode: theme ?? "light" }} >
        <div className="container">
          <Navigation header={<Header />} />
        </div>
        <ToastContainer theme='dark' />
      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
