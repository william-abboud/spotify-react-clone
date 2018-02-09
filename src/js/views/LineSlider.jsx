import React, { Component } from 'react';
import { string, number, object, func } from 'prop-types';
import { Line } from 'rc-progress';

function extractValueFromTransformStr(tansformStr) {
  const openBracketIndex = tansformStr.indexOf("(");
  const closeBracketIndex = tansformStr.indexOf(")");
  const valueStr = tansformStr.slice(openBracketIndex + 1, closeBracketIndex);

  return parseInt(valueStr, 10);
}

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
    this.calcLeftOffset = this.calcLeftOffset.bind(this);
    this.moveHandleLeft = this.moveHandleLeft.bind(this);

    this.state = {
      percent: undefined,
    };
  }

  componentWillUnmount() {
    document.body.removeEventListener("mousemove", this.onDrag);
    document.body.removeEventListener("mouseup", this.onDragRelease);
  }

  componentDidMount() {
    this.lineDimensions = this.line.path.getBoundingClientRect();
    this.handle.style.willChange = "transform";
  }

  componentWillReceiveProps({ percent }) {
    const handleOffset = this.calcSliderProgressInPx(percent);
    this.moveHandleLeft(handleOffset);
    this.setState({ percent });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.percent === nextState.percent &&
      this.props.percent === nextProps.percent
    ) {
      return false;
    }

    return true;
  }

  calcSliderProgressInPx(percent) {
    const totalLineWidth = this.lineDimensions.width;

    return Math.round( percent * (totalLineWidth / 100) );
  }

  calcSliderProgressPercentage() {
    const totalLineWidth = this.lineDimensions.width;
    const handleLeftOffset = extractValueFromTransformStr(this.handle.style.transform);

    return Math.round( (handleLeftOffset / totalLineWidth) * 100);
  }

  calcLeftOffset(clientX) {
    const {
      left: lineLeftOffset,
      width: totalLineWidth
    } = this.lineDimensions;
    
    const leftOffset =  clientX - lineLeftOffset;

    return (
      leftOffset > totalLineWidth
        ? totalLineWidth
        : leftOffset < 0
          ? 0
          : leftOffset
    );
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
    this.moveHandleLeft(this.calcLeftOffset(clientX));
    this.setState({ percent: this.calcSliderProgressPercentage() }, () => {
      this.props.onProgressChange(this.state.percent);
    });
  }

  onDragRelease() {
    document.body.removeEventListener("mousemove", this.onDrag);
  }

  onSliderPress({ clientX, target }) {
    if (target === this.handle) {
      // mousedown will handle it
      return;
    }

    this.moveHandleLeft(this.calcLeftOffset(clientX));

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
    const { className, style, onProgressChange, ...lineProps } = this.props;

    return (
      <div className="line-slider" onMouseDown={this.onSliderPress} style={style}>
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