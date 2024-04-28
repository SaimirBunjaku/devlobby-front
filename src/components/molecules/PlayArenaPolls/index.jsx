import React from 'react';
import { Link } from 'react-router-dom';
import pollsImage from '../../../assets/images/polls-png.png';
import './PlayArenaPolls.scss';

function PlayArenaPolls() {
  return (
    <div className="play-arena-polls-container">
      <div className="polls-image">
        <img src={pollsImage} alt="Polls" className="polls-image" />
      </div>
      <div className="polls-content">
        <h3 className="polls-heading">We want to know more about you!</h3>
        <p>Take these polls and tell us your opinions.</p>
        <Link to="/polls" className="poll-button">
          Take Polls
        </Link>
      </div>
    </div>
  );
}

export default PlayArenaPolls;
