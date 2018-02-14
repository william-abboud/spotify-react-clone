import React, { Component } from 'react';
import { func, number, bool } from 'prop-types';
import LineSlider from './LineSlider';
import PlayIcon from '!svg-react-loader!../../assets/icons/play.svg';
import PauseIcon from '!svg-react-loader!../../assets/icons/pause.svg';
import ForwardIcon from '!svg-react-loader!../../assets/icons/forward.svg';
import BackwardIcon from '!svg-react-loader!../../assets/icons/backward.svg';
import ShuffleIcon from '!svg-react-loader!../../assets/icons/shuffle.svg';
import RepeatIcon from '!svg-react-loader!../../assets/icons/loop.svg';

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
    const { mute, unmute, muted } = this.props;

    if (muted) {
      unmute();
    } else {
      mute();
    }
  }

  render() {
    const {
      play,
      playing,
      pause,
      volume,
      audioLength,
      currentTime,
      goToPrevAudio,
      goToNextAudio
    } = this.props;

    const progressPercent = (currentTime / audioLength) * 100;

    return (
      <div className="player-controls">
        <LineSlider
          percent={progressPercent}
          className="audio-progress"
          strokeColor="#91dd59"
          onProgressChange={this.convertPercentageToTime}
        />

        <div className="button-controls">
          <button className="shuffle-button">
            <ShuffleIcon className="shuffle-icon" />
          </button>
          
          <button className="prev-audio-button" onClick={goToPrevAudio}>
            <BackwardIcon className="backward-icon" />
          </button>

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

          <button className="next-audio-button" onClick={goToNextAudio}>
            <ForwardIcon className="forward-icon" />
          </button>
          
          <button className="repeat-button">
            <RepeatIcon className="shuffle-icon" />
          </button>

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

PlayerControls.propTypes = {
  play: func.isRequired,
  pause: func.isRequired,
  stop: func.isRequired,
  mute: func.isRequired,
  unmute: func.isRequired,
  setVolume: func.isRequired,
  volume: number.isRequired,
  muted: bool.isRequired,
  playing: bool.isRequired,
  audioLength: number.isRequired,
  currentTime: number.isRequired,
  setCurrentTime: func.isRequired,
  goToPrevAudio: func.isRequired,
  goToNextAudio: func.isRequired,
};

export default PlayerControls;