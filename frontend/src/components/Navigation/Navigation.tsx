import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main, Login } from '../../pages'

interface Props {
  header?: React.ReactNode
}

const Navigation: React.FC<Props> = ({ header }) => {
  return (
    <BrowserRouter basename="/">
      {header && header}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
