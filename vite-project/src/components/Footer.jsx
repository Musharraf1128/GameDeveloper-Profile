// src/components/Footer.jsx
import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <p>&copy; {currentYear} Musharraf. All rights reserved.</p>
      <div className="social-links">
        <a href="https://github.com/Musharraf1128" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://bsky.app/profile/musharraf8.bsky.social" target="_blank" rel="noopener noreferrer">Bsky</a>
        <a href="https://www.linkedin.com/in/musharaf-shah-0904451b7/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
};