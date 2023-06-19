import React from 'react'
import { StyledInput, StyledLabel, StyledInputWrapper } from './style'

interface Props {
  label?: string
  placeholder?: string
  type?: "text" | "number" | "password"
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = ({ label, placeholder, type = "text", onChange }) => {
  return (
    <StyledInputWrapper>
      {label && (
        <StyledLabel htmlFor="input">{label}</StyledLabel>
      )}
      <StyledInput id="input" placeholder={placeholder ?? ""} type={type} onChange={onChange} />
    </StyledInputWrapper>
  )
}

export default Input
