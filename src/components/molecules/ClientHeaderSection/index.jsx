import React from 'react';
import { Link } from 'react-router-dom';
import LearnMoreButton from "../../atoms/LearnMoreButtonPage"
import HeaderBanner from "../../atoms/HeaderBanner"
import PlayCodeArenaButton from "../../atoms/PlayCodeArenaButton"
import './ClientHeaderSection.scss'

function ClientHeaderSection() {
  return (
    <div className='clientHeaderSection'>
      <header className="header">
        <Link to="/learn-more">
          <LearnMoreButton />
        </Link>
        <HeaderBanner />
        <Link to="/code-arena">
          <PlayCodeArenaButton />
        </Link>
      </header>
    </div>
  );
}

export default ClientHeaderSection;
