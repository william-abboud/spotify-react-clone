import React from 'react';
import Player from './Player.jsx';
import PlayerControls from './PlayerControls.jsx';

function PlayerWithControls(props) {
  return <Player {...props} className="player-with-controls" render={ state => <PlayerControls {...state} /> }/>;
}

export default PlayerWithControls;