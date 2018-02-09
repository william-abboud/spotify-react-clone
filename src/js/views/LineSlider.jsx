import React, { Component } from 'react';
import { string, number, object, func } from 'prop-types';
import { Line } from 'rc-progress';

class LineSlider extends Component {
  constructor(props) {
    super(props);

    this.onDrag = this.onDrag.bind(this);
    this.onDragRelease = this.onDragRelease.bind(this);
    this.onHandleGrab = this.onHandleGrab.bind(this);
    this.onSliderPress = this.onSliderPress.bind(this);
    this.getHandleRef = this.getHandleRef.bind(this);
    this.getLineRef = this.getLineRef.bind(this);
    this.calcSliderProgressInPx = this.calcSliderProgressInPx.bind(this);
    this.calcSliderProgressPercentage = this.calcSliderProgressPercentage.bind(this);
    this.moveHandleLeft = this.moveHandleLeft.bind(this);

    this.state = {
      percent: undefined,
    };
  }

  componentWillUnmount() {
    document.body.removeEventListener("mousemove", this.onDrag);
    document.body.removeEventListener("mouseup", this.onDragRelease);
  }

  componentWillReceiveProps({ percent }) {
    const handleOffset = this.calcSliderProgressInPx(percent);
    this.moveHandleLeft(handleOffset);
    this.setState({ percent });
  }

  calcSliderProgressInPx(percent) {
    const totalLineWidth = this.line.path.getBoundingClientRect().width;
    
    return Math.round( percent * (totalLineWidth / 100) );
  }

  calcSliderProgressPercentage() {
    const numberPattern = /\D/g;
    const totalLineWidth = this.line.path.getBoundingClientRect().width;
    const handleLeftOffset = Number(
      this.handle.style.transform.replace(numberPattern, '')
    );

    return Math.round( (handleLeftOffset / totalLineWidth) * 100);
  }

  moveHandleLeft(distance) {
    this.handle.style.transform = `translateX(${distance}px)`;
  }

  getHandleRef(ref) {
    this.handle = ref;
  }

  getLineRef(ref) {
    this.line = ref;
  }

  onDrag({ clientX }) {
    this.moveHandleLeft(clientX);
    this.setState({ percent: this.calcSliderProgressPercentage() }, () => {
      this.props.onProgressChange(this.state.percent);
    });
  }

  onDragRelease() {
    document.body.removeEventListener("mousemove", this.onDrag);
  }

  onSliderPress({ clientX }) {
    this.moveHandleLeft(clientX);

    this.setState({ percent: this.calcSliderProgressPercentage() }, () => {
      this.props.onProgressChange(this.state.percent);
      this.onHandleGrab();
    });
  }

  onHandleGrab() {
    document.body.addEventListener("mousemove", this.onDrag);
    document.body.addEventListener("mouseup", this.onDragRelease);
  }

  render() {
    const { className, onProgressChange, ...lineProps } = this.props;

    return (
      <div className="line-slider" onMouseDown={this.onSliderPress}>
        <button
          className="handle"
          onMouseDown={this.onHandleGrab}
          ref={this.getHandleRef}
        />
        <Line
          {...lineProps}
          {...this.state}
          ref={this.getLineRef}
        />
      </div>
    );
  }
}

LineSlider.propTypes = {
  percent: number,
  className: string,
  strokeColor: string,
  style: object,
  onProgressChange: func,
};

LineSlider.defaultProps = {
  onProgressChange() {}
};

export default LineSlider;