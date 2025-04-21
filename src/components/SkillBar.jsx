import React from 'react';

export const SkillBar = ({ name, level }) => {
  return (
    <div className="skill">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percentage">{level}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-level" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );
};
