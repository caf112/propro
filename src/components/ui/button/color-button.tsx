import React from 'react'
import './button.css'

interface ButtonProps {
  text: string
  onClick: () => void
  fontColor?: string
  bgColor?: string
}

export const ColorInputButton: React.FC<ButtonProps> = ({ text, onClick, fontColor, bgColor }) => {
  return (
    <button
      className="custom-button"
      onClick={onClick}
      style={{ color: fontColor, backgroundColor: bgColor }}
    >
      {text}
    </button>
  )
}
