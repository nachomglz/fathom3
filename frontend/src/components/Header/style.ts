import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  padding: 1rem 0;
  margin-bottom: 2rem;
`

export const HeaderContent = styled.div`
  h2 > a {
    text-decoration: none;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const HeaderNavigation = styled.div`
  display: flex;
  gap: 1rem;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`
