import styled from 'styled-components'

export const SelectWrapper = styled.div `
  width: 100%;
  select {
    cursor: pointer;
    background-color: #565656;
    padding: .8rem 1rem;
    border: none;
    border-radius: 1rem;
    font-size: 1rem;
    outline: none;
    height: 3rem;
    width: 100%;
  }
  transition: filter .2s ease-in-out;

  &:hover {
    filter: brightness(80%);
  }
`
