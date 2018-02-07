import React from 'react';
import Player from './Player.jsx';
import PlayerControls from './PlayerControls.jsx';

function PlayerWithControls(props) {
  return <Player {...props} render={ state => <PlayerControls {...state} /> }/>;
}

export default PlayerWithControls;