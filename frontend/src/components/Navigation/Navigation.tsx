import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main } from '../../pages'

interface Props {
  header?: React.ReactNode
}

const Navigation: React.FC<Props> = ({ header }) => {
  return (
    <BrowserRouter basename="/">
      {header && header}
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation
