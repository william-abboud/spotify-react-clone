import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import classNames from 'classnames';

const NO_OP = () => {};

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      stopped: false,
      volume: 1.0,
      audioLength: 0,
      currentTime: 0,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.mute = this.mute.bind(this);
    this.unmute = this.unmute.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
  }

  componentDidMount() {
    this.sound = new Audio();
    this.sound.preload = "metadata";
    this.sound.src = this.props.audio;

    const _this = this;
    this.sound.addEventListener('loadedmetadata', () => {
      const audioLength = Math.round(_this.sound.duration);

      _this.setState(() => ({ audioLength }));
    });

    this.sound.addEventListener('timeupdate', () => {
      const currentTime = Math.round(_this.sound.currentTime);

      _this.setState({ currentTime });
    });

    if (this.props.autoplay) {
      this.play();
    }
  }

  componentDidUpdate() {
    const { state } = this;

    this.sound.volume = state.volume;

    if (state.playing) {
      this.sound.play();
    } else {
      this.sound.pause();
    }

    if (state.stopped) {
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
  audio: string,
  autoplay: bool,
  className: string,
  setCurrentTime: func,
  render: func.isRequired,
};

Player.defaultProps = {
  setCurrentTime() {}
};

export default Player;