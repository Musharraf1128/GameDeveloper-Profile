import React from 'react';

export const TerminalWindow = ({ title, children }) => {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-title">{title}</div>
        <div className="terminal-controls">
          <div className="terminal-control"></div>
          <div className="terminal-control"></div>
          <div className="terminal-control"></div>
        </div>
      </div>
      <div className="terminal-content">
        {children}
      </div>
    </div>
  );
};
