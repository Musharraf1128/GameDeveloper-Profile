import React from 'react';

export const RetroButton = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button 
      type={type} 
      className={`retro-button ${className}`} 
      onClick={onClick}
    >
      <span className="button-content">{children}</span>
    </button>
  );
};