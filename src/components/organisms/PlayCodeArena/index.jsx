import React from 'react';
import PlayArenaCards from '../../molecules/PlayArenaCards'
import PlayArenaHeading from '../../atoms/PlayArenaHeading'
import PlayArenaPolls from '../../molecules/PlayArenaPolls';

const PlayCodeArena = () => {
  return (
    <div>
      <PlayArenaHeading />
      <PlayArenaCards />
      <PlayArenaPolls />
    </div>
  );
  
}

export default PlayCodeArena;
