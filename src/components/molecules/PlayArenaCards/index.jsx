import React, { useState } from 'react';
import './PlayArenaCards.scss';
import theoryImage from '../../../assets/images/Theory-png.png';
import practiceImage from '../../../assets/images/Practice-png.png';
import SelectButton from '../../atoms/SelectButton';
import ChallengeArea from '../../organisms/ChallengeArea';
import TheoreticalQuestions from '../TheoreticalQuestions';

function PlayArenaCards() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelect = (cardName) => {
    setSelectedCard(cardName);
  };

  return (
    <>
      <div className="play-arena-cards-container">
        <div className="play-arena-cards">
          <div className={`card ${selectedCard === 'Theory' ? 'selected' : ''}`}>
            <div className="content">
              <h2>Theoretical Questions</h2>
              <p>Test your theory knowledge and expertise with a variety of theoretical questions. Explore concepts and frameworks to expand your understanding.</p>
            </div>
            <div className="image" style={{ backgroundImage: `url(${theoryImage})` }}></div>
            <SelectButton onClick={() => handleCardSelect('Theory')} selected={selectedCard === 'Theory'} />
          </div>
          <div className={`card ${selectedCard === 'Code' ? 'selected' : ''}`}>
            <div className="content">
              <h2>Coding Questions</h2>
              <p>Practice your coding skills with challenging coding questions. Solve problems, write algorithms, and improve your programming proficiency.</p>
            </div>
            <div className="image" style={{ backgroundImage: `url(${practiceImage})` }}></div>
            <SelectButton onClick={() => handleCardSelect('Code')} selected={selectedCard === 'Code'} />
          </div>
        </div>
        {selectedCard === 'Theory' && <TheoreticalQuestions />}
        {selectedCard === 'Code' && <ChallengeArea />}
      </div>
    </>
  );
}

export default PlayArenaCards;
