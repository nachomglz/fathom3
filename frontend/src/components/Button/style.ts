import styled from 'styled-components'
import { Type } from './Button'

export const ButtonWrapper = styled.div<{ type: Type }> `
  width: 100%;
  button {
    cursor: pointer;
    background-color: ${({ type }) => {
    switch (type) {
      case Type.NORMAL: return "#565656";
      case Type.INFO: return "#00d1ff";
      case Type.DANGER: return "#ff0000"
      case Type.WARNING: return "rgba(0, 209, 255, .7);"
    }
  }};
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

export const StyledActionButton = styled.div`
  background-color: #333333;
  border-radius: .7rem;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    background: none;
    cursor: pointer;
    border: none;
    padding: .8rem;
    
    img {
      height: 1.4rem;
      width: 1.4rem;
    }

  }
`
