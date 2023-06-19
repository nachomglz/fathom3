import React from 'react'
import { ButtonWrapper } from './style'

export enum Type {
  NORMAL,
  INFO,
  DANGER,
  WARNING
}

interface Props {
  children: React.ReactNode,
  type: Type
  onClick?: () => void
}

export const Button: React.FC<Props> = ({ children, type = Type.NORMAL, onClick }) => {

  return (
    <ButtonWrapper type={type}>
      <button onClick={onClick} >{children}</button>
    </ButtonWrapper>
  )
}
