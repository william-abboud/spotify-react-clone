import React, { Component } from 'react';
import { string, bool, func, number, oneOfType, arrayOf } from 'prop-types';
import classNames from 'classnames';

const NO_OP = () => {};

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      stopped: false,
      loop: false,
      volume: 1.0,
      audioLength: 0,
      currentTime: 0,
      currentAudioIndex: 0,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.mute = this.mute.bind(this);
    this.unmute = this.unmute.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
    this.goToNextAudio = this.goToNextAudio.bind(this);
    this.goToPrevAudio = this.goToPrevAudio.bind(this);
    this.initPlayer = this.initPlayer.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.repeat = this.repeat.bind(this);
  }

  initPlayer(props) {
    const { audio, currentAudioIndex, autoplay } = props;

    this.sound = new Audio();
    this.sound.preload = "metadata";

    if (Array.isArray(audio)) {
      this.sound.src = audio[currentAudioIndex];
    } else {
      this.sound.src = audio;
    }

    const _this = this;
    this.sound.addEventListener('loadedmetadata', () => {
      const audioLength = Math.round(_this.sound.duration);

      _this.setState(() => ({ audioLength }));
    });

    this.sound.addEventListener('timeupdate', () => {
      const currentTime = Math.round(_this.sound.currentTime);

      _this.setState({ currentTime });
    });

    this.sound.addEventListener('ended', () => {
      this.goToNextAudio();
    });

    if (autoplay) {
      this.play();
    }
  }

  componentDidMount() {
    this.initPlayer(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentAudioIndex, volume } = this.state;
    const { audio } = this.props;
    this.sound.volume = volume;

    if (currentAudioIndex !== prevState.currentAudioIndex &&
        (currentAudioIndex >= 0 ||
        (Array.isArray(audio) && currentAudioIndex <= audio.length - 1))
    ) {
      this.sound.pause();
      this.sound = null;
      this.initPlayer({
        ...this.props,
        currentAudioIndex
      });

      return;
    }

    if (this.state.playing) {
      this.sound.play();
    } else {
      this.sound.pause();
    }

    if (this.state.stopped) {
      this.sound.pause();
      this.sound.currentTime = 0;
    }
  }

  play(cb) {
    const callback = typeof cb === "function" ? cb : NO_OP;
    this.setState({ playing: true, stopped: false }, callback);
  }

  pause(cb) {
    const callback = typeof cb === "function" ? cb : NO_OP;
    this.setState({ playing: false, stopped: false }, callback);
  }

  stop(cb) {
    const callback = typeof cb === "function" ? cb : NO_OP;
    this.setState({ stopped: true, playing: false }, callback);
  }

  mute(cb) {
    const callback = typeof cb === "function" ? cb : NO_OP;
    this.setVolume(0, callback);
  }

  unmute(cb) {
    const callback = typeof cb === "function" ? cb : NO_OP;
    this.setVolume(1, callback);
  }

  get muted() {
    return this.state.volume === 0;
  }

  setVolume(value, cb) {
    if (typeof value !== "number") {
      throw new Error("Volume value supplied must be a number in the range of 0.0 to 1.0 !");
    }

    let volume = value;

    if (value > 1) {
      volume = 1;
    } else if (value < 0) {
      volume = 0;
    }

    const callback = typeof cb === "function" ? cb : NO_OP;

    this.setState({ volume }, callback);
  }

  setCurrentTime(value) {
    this.sound.currentTime = value;
  }

  goToPrevAudio() {
    const { currentAudioIndex } = this.state;

    if (currentAudioIndex === 0) {
      return;
    }

    this.setState({ currentAudioIndex: currentAudioIndex - 1 });
  }

  goToNextAudio() {
    const { currentAudioIndex, loop } = this.state;
    const { audio } = this.props;

    if (!loop &&
      (Array.isArray(audio) && currentAudioIndex === audio.length - 1) ||
      (!Array.isArray(audio) && currentAudioIndex === 0)
    ) {
      return;
    } else if (loop) {
      this.setState({ currentAudioIndex: 0 });
      return;
    }

    this.setState({ currentAudioIndex: this.state.currentAudioIndex + 1 });
  }

  shuffle() {

  }

  repeat() {
    this.setState({ loop: !this.state.loop });
  }

  render() {
    const className = classNames("player", this.props.className);

    return (
      <article className={className}>
        {
          this.props.render(Object.assign({}, this.state, {
            play: this.play,
            pause: this.pause,
            stop: this.stop,
            setVolume: this.setVolume,
            setCurrentTime: this.setCurrentTime,
            goToNextAudio: this.goToNextAudio,
            goToPrevAudio: this.goToPrevAudio,
            mute: this.mute,
            unmute: this.unmute,
            muted: this.muted,
          }))
        }
      </article>
    );
  }
}

Player.propTypes = {
  audio: oneOfType([ string, arrayOf(string) ]).isRequired,
  currentAudioIndex: number,
  autoplay: bool,
  className: string,
  render: func.isRequired,
};

Player.defaultProps = {
  autoplay: false,
  className: "",
  currentAudioIndex: 0,
};

export default Player;