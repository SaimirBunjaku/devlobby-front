import React from 'react';
import { Link } from 'react-router-dom';
import './PlayArenaLetsgoButton.scss';

function PlayArenaLetsgoButton({ selectedCard }) {
  return (
    <div className="letsgo-button-container">
      {selectedCard !== null ? (
        <Link
          to={selectedCard === 0 ? '/playcodearena/theoretical' : '/playcodearena/practical'}
          className="letsgo-button active bn5"
        >
          <span>Enter Arena →</span>
        </Link>
      ) : (
        <button className="letsgo-button bn5" disabled>
          <span>Select a Card</span> 
        </button>
      )}
    </div>
  );
}

export default PlayArenaLetsgoButton;