import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { ThreeBackground } from './components/ThreeBackground';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RetroCursor } from './components/RetroCursor';
import './App.css';

const App = () => {
  const [games] = useState([
    { 
      id: 1, 
      title: 'Tenzies', 
      description: 'A quick dice-matching game.',
      icon: '/src/images/tenzies-icon.png',
      url: '/games/tenzies',
      technologies: ['React']
    },
    { 
      id: 2, 
      title: 'Assembly: Endgame', 
      description: 'A Classic word-guessing game. (not hangman)',
      icon: '/src/images/assembly-icon.png',
      url: '/games/assembly-endgame',
      technologies: ['React']
    },
    { 
      id: 3, 
      title: 'Tic Tac Tow', 
      description: 'Under Development!',
      icon: '/src/images/tic-tac-toe-icon.png', 
      url: '/games/tic-tac-toe',
      technologies: ['Python']
    },
  ]);

  return (
    <Router>
      <div className="app">
        <ThreeBackground />
        <RetroCursor />
        <div className="content">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home games={games} />} />
            {/* add route here
            
            */}
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;