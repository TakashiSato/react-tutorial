import './App.css';
import Game from './components/Game';
import React from 'react';

const BOARD_SIZE = 3;

const App = () => (
  <div className="App">
    <Game boardSize={BOARD_SIZE} />
  </div>
);

export default App;
