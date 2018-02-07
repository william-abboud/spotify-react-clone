import React, { Component } from 'react';
import { func, number, bool } from 'prop-types';
import { Line } from 'rc-progress';

class PlayerControls extends Component {
  constructor(props) {
    super(props);

    this.changeVolume = this.changeVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.getProgressRef = this.getProgressRef.bind(this);
    this.calcProgressBarWidth = this.calcProgressBarWidth.bind(this);

    this.state = {
      progressBarWidth: 'auto',
    };
  }

  componentDidMount() {
    this.setState({ progressBarWidth: this.calcProgressBarWidth() })
  }

  calcProgressBarWidth() {
    return Math.round(this.progressEl.path.getBoundingClientRect().width);
  }

  changeVolume({ target }) {
    this.props.setVolume(Number(target.value));
  }

  getProgressRef(ref) {
    this.progressEl = ref;
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
    const { play, pause, stop, volume, muted, audioLength, currentTime } = this.props;
    const { progressBarWidth } = this.state;
    const progressPercent = ( currentTime / audioLength ) * 100;

    return (
      <div className="player-controls">
        <Line 
          percent={progressPercent}
          style={{ width: progressBarWidth }}
          className="audio-progress"
          strokeColor="#91dd59"
          ref={this.getProgressRef}
        />
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
  muted: bool.isRequired,
  audioLength: number.isRequired,
  currentTime: number.isRequired,
};

export default PlayerControls;