import React from 'react'
import { HeaderWrapper, HeaderContent, HeaderNavigation } from './style'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <h2>
          <Link to="/">
            SplitGreat
          </Link>
        </h2>
        <HeaderNavigation>
          <Link to="/login">Login</Link>
        </HeaderNavigation>
      </HeaderContent>
    </HeaderWrapper>
  )

}

export default Header
