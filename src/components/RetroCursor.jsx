import React, { useState, useEffect } from 'react';

export const RetroCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const showCursor = () => {
      setVisible(true);
    };
    
    const hideCursor = () => {
      setVisible(false);
    };
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseenter', showCursor);
    window.addEventListener('mouseleave', hideCursor);
    
    // Add a style to hide the default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseenter', showCursor);
      window.removeEventListener('mouseleave', hideCursor);
      
      // Restore default cursor
      document.body.style.cursor = 'default';
    };
  }, []);
  
  if (!visible) return null;
  
  return (
    <div 
      className="retro-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  );
};
