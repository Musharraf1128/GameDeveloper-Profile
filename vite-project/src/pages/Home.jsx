import React from 'react';
import { Link } from 'react-router-dom';
import { GameCard } from '../components/GameCard';
import { TerminalText } from '../components/TerminalText';
import { GlitchText } from '../components/GlitchText';
import { SkillBar } from '../components/SkillBar';

export const Home = ({ games }) => {
  return (
    <>  
      <section className="profile-section" id="home">
        <div className="profile-info">
          <h2 className="glow-text typewriter">Games by Musharraf</h2>
          <TerminalText text="Welcome to my retro-styled game development portfolio. Here you can find all my web-based games and projects." typingSpeed={30} />
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{games.length}</span>
              <span className="stat-label">Games</span>
            </div>
            <div className="stat">
              <span className="stat-value">1</span>
              <span className="stat-label">Year Experience</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="games-section" id="games">
        <h2 className="glow-text"><GlitchText text="My Games" interval={3000} /></h2>
        <div className="games-container">
          {games.map(game => (
            // <Link to={`/games/${game.id}`} key={game.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            //   <GameCard game={game} />
            // </Link>
            <GameCard game={game} key={game.id}/>
          ))}
        </div>
      </section>
      
      <section className="about-section" id="about">
        <h2 className="glow-text">About Me</h2>
        <div className="about-content">
        <div className="about-text">
          <p>I'm Musharraf, a first-year undergraduate student with a deep passion for programming, technology, and building cool stuff on the web.</p>
          <p>I love experimenting with web development and occasionally dip my toes into game development—not a game designer (yet), but I know how to break things in style!</p>


            <div className="skills">
              <h3>Skills</h3>
              <div className="skill-bars">
                <SkillBar name="JavaScript" level={40} />
                <SkillBar name="React" level={50} />
                <SkillBar name="ThreeJS" level={20} />
                <SkillBar name="Python" level={50} />
                <SkillBar name="Django" level={35} />
                <SkillBar name="Game Design" level={5} />
              </div>
            </div>
    
          </div>
        </div>
      </section>
      
      <section className="contact-section" id="contact">
        <h2 className="glow-text">Contact Me</h2>
        <div className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="terminal-input" placeholder="_" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="terminal-input" placeholder="_" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea className="terminal-input" rows="5" placeholder="_"></textarea>
          </div>
          <button type="submit" className="btn">Send Message</button>
        </div>
      </section>
    </>
  );
};