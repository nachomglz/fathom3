import React from 'react'
import { StyledActionButton } from './style'
import removeIcon from '../../assets/icons/bin-svgrepo-com.svg'
import editIcon from '../../assets/icons/edit-svgrepo-com.svg'
import crossIcon from '../../assets/icons/cross-svgrepo-com.svg'
import confirmIcon from '../../assets/icons/check-svgrepo-com.svg'

export enum Type {
  AFIRMATIVE,
  NEGATIVE,
}

interface Props {
  type: Type
  isEditing?: boolean
  onClick?: () => void
}

export const ActionButton: React.FC<Props> = ({ type, onClick, isEditing }) => {

  return (
    <StyledActionButton>
      <button onClick={onClick}>
        <img
          src={
            isEditing
              ? (type === Type.AFIRMATIVE ? confirmIcon : crossIcon)
              : (type === Type.AFIRMATIVE ? editIcon : removeIcon)
          }
          alt={
            isEditing
              ? (type === Type.AFIRMATIVE ? "Confirm edit" : "Cancel edit")
              : (type === Type.AFIRMATIVE ? "Edit icon" : "Delete icon")
            
          }
        />
      </button>
    </StyledActionButton>
  )
}
