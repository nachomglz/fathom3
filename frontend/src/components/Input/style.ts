import styled from 'styled-components'

export const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.color_mode === 'dark' ? '#565656' : '#ffffff'};
  color: ${({ theme }) => theme.color_mode === 'dark' ? '#ffffff' : '#565656'};
  padding: .8rem 1rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  outline: none;
  height: 3rem;
  transition: border .2s ease-in-out;
  margin-top: .4rem;

  &:focus {
    border: 3px solid rgba(0, 209, 255, .7);
  }
`

export const StyledLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: .3rem;
`

export const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`
