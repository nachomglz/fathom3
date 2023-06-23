import styled from 'styled-components'

export const MainContainer = styled.main`
`

export const WelcomeBanner = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: .4rem;

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }
`

export const ExpenseListContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  gap: .4rem;
  margin-top:  3rem;

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.2rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }
`
