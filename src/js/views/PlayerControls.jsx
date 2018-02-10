import React, { Component } from 'react';
import { func, number, bool } from 'prop-types';
import { Line } from 'rc-progress';
import LineSlider from './LineSlider.jsx';
import PlayIcon from '!svg-react-loader!../../assets/icons/play.svg';
import PauseIcon from '!svg-react-loader!../../assets/icons/pause.svg';

class PlayerControls extends Component {
  constructor(props) {
    super(props);

    this.changeVolume = this.changeVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.convertPercentageToTime = this.convertPercentageToTime.bind(this);
    this.convertPercentageToVolume = this.convertPercentageToVolume.bind(this);
  }

  changeVolume(value) {
    this.props.setVolume(value);
  }

  convertPercentageToTime(percent) {
    const { audioLength, setCurrentTime } = this.props;
    const currentTime = (percent / 100) * audioLength;
    setCurrentTime(currentTime);
  }

  convertPercentageToVolume(percent) {
    this.changeVolume(percent / 100);
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
    const { play, playing, pause, stop, volume, muted, audioLength, currentTime } = this.props;
    const progressPercent = ( currentTime / audioLength ) * 100;

    return (
      <div className="player-controls">
        <LineSlider
          percent={progressPercent}
          className="audio-progress"
          strokeColor="#91dd59"
          onProgressChange={this.convertPercentageToTime}
        />

        <div className="button-controls">
          {
            (playing)
            ?
              <button onClick={pause} className="pause-button">
                <PauseIcon className="pause-icon" />
              </button>
              
            :
              <button onClick={play} className="play-button">
                <PlayIcon className="play-icon" />
              </button>
          }

          <LineSlider
            style={{ width: "100px" }}
            percent={volume * 100}
            onProgressChange={this.convertPercentageToVolume}
          />
        </div>
      </div>
    );
  }
}

/*
<button onClick={this.toggleMute}>{ muted ? 'Unmute' : 'Mute' }</button>
        
<input
  type="number"
  min="0.0"
  max="1.0"
  step="0.05"
  value={volume}
  onChange={this.changeVolume}
/>
*/

PlayerControls.propTypes = {
  play: func.isRequired,
  pause: func.isRequired,
  stop: func.isRequired,
  mute: func.isRequired,
  setVolume: func.isRequired,
  volume: number.isRequired,
  muted: bool.isRequired,
  playing: bool.isRequired,
  audioLength: number.isRequired,
  currentTime: number.isRequired,
  setCurrentTime: func.isRequired,
};

export default PlayerControls;