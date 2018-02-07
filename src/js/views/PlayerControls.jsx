import React, { Component } from 'react';
import { func, number } from 'prop-types';

class PlayerControls extends Component {
  constructor(props) {
    super(props);

    this.changeVolume = this.changeVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  changeVolume({ target }) {
    this.props.setVolume(Number(target.value));
  }

  toggleMute() {
    const { mute, unmute, volume, muted } = this.props;

    if (muted) {
      unmute();
    } else {
      mute();
    }
  }

  render() {
    const { play, pause, stop, volume, muted } = this.props;

    return (
      <div className="player-controls">
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={stop}>Stop</button>
        <button onClick={this.toggleMute}>{ muted ? 'Unmute' : 'Mute' }</button>
        <input
          type="number"
          min="0.0"
          max="1.0"
          step="0.05"
          value={volume}
          onChange={this.changeVolume}
        />
      </div>
    );
  }
}

PlayerControls.propTypes = {
  play: func.isRequired,
  pause: func.isRequired,
  stop: func.isRequired,
  mute: func.isRequired,
  setVolume: func.isRequired,
  volume: number.isRequired,
};

export default PlayerControls;