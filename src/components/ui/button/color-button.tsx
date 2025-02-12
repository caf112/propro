import React from 'react';
import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  color: string;  
}

export const ColorInputButton: React.FC<ButtonProps> = ({ text, onClick, color }) => {
  return (
    <button 
      className="custom-button" 
      onClick={onClick} 
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};

