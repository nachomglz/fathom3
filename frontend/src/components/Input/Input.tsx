import React from 'react'
import { StyledInput, StyledLabel, StyledInputWrapper } from './style'

interface Props {
  value?: string | number
  label?: string
  placeholder?: string
  style?: React.CSSProperties
  type?: "text" | "number" | "password"
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: number
}

const Input: React.FC<Props> = ({ min, label, placeholder, type = "text", onChange, value, style }) => {
  return (
    <StyledInputWrapper style={style}>
      {label && (
        <StyledLabel htmlFor="input">{label}</StyledLabel>
      )}
      <StyledInput id="input" placeholder={placeholder ?? ""} type={type} onChange={onChange} value={value} min={min} />
    </StyledInputWrapper>
  )
}

export default Input
