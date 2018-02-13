import React from 'react';
import Player from './Player';
import PlayerControls from './PlayerControls';

function PlayerWithControls(props) {
  return (
    <Player
      {...props}
      className="player-with-controls"
      render={state => <PlayerControls {...state} />}
    />
  );
}

export default PlayerWithControls;