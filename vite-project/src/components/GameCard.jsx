import React from 'react';
import "./GameCard.css"

export const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-icon">
        <img src={game.icon} alt={game.title} />
      </div>
      <div className="game-info">
        <h3>{game.title}</h3>
        <p>{game.description}</p>
        <div className="game-technologies">
          {game.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>
        <a href={game.url} className="btn play-btn">
          Play Game
        </a>
      </div>
    </div>
  );
};