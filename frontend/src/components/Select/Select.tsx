import React from 'react'
import { SelectWrapper } from './style'

export const Select: React.FC<React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>> = (props) => {

  return (
    <SelectWrapper>
      <select {...props} />
    </SelectWrapper>
  )
}
