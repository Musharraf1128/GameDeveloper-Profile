import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RetroCursor } from './components/RetroCursor';
import Tenzies from './components/games/Tenzies'
import './App.css';

const App = () => {
  const [games] = useState([
    { 
      id: 1, 
      title: 'Tenzies', 
      description: 'A quick dice-matching game.',
      icon: '/tenzies-icon.png',
      url: '/games/1',
      technologies: ['React']
    },
    { 
      id: 2, 
      title: 'Assembly: Endgame', 
      description: 'A Classic word-guessing game. (not hangman)',
      icon: '/assembly-icon.png',
      url: '/games/assembly-endgame',
      technologies: ['React']
    },
    { 
      id: 3, 
      title: 'Tic Tac Tow', 
      description: 'Under Development!',
      icon: '/tic-tac-toe-icon.png', 
      url: '/games/tic-tac-toe',
      technologies: ['Python']
    },
  ]);

  return (
    <Router>
      <div className="app">
        <RetroCursor />
        <div className="content">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home games={games} />} />
            <Route path="/games/1" element={<Tenzies />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;