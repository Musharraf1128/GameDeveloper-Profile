import React, { useState, useEffect } from 'react';

export const GlitchText = ({ text, interval = 2000 }) => {
  const [glitched, setGlitched] = useState(false);
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitched(true);
      
      setTimeout(() => {
        setGlitched(false);
      }, 200);
    }, interval);
    
    return () => clearInterval(glitchInterval);
  }, [interval]);
  
  return (
    <span className={`glitch-text ${glitched ? 'active' : ''}`}>
      {text}
    </span>
  );
};