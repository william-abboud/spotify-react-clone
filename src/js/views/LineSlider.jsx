import React, { Component } from 'react';
import { string, number, object, func } from 'prop-types';
import { Line } from 'rc-progress';

function extractValueFromTransformStr(tansformStr) {
  const openBracketIndex = tansformStr.indexOf("(");
  const closeBracketIndex = tansformStr.indexOf(")");
  const valueStr = tansformStr.slice(openBracketIndex + 1, closeBracketIndex);

  return parseFloat(valueStr, 10);
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
    this.calcSliderProgressPercentage = this.calcSliderProgressPercentage.bind(this);
    this.calcSliderProgressInPx = this.calcSliderProgressInPx.bind(this);
    this.calcLeftOffset = this.calcLeftOffset.bind(this);
    this.moveHandleLeft = this.moveHandleLeft.bind(this);

    this.state = {
      percent: undefined,
    };
  }

  componentDidMount() {
    this.handle.style.willChange = "transform";
  }

  componentWillReceiveProps({ percent }) {
    if (typeof percent === "number" && !Number.isNaN(percent)) {
      this.setState({ percent }, () => {
        this.moveHandleLeft(this.calcSliderProgressInPx());
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.percent === nextState.percent &&
      this.props.percent === nextProps.percent
    ) {
      return false;
    }

    return true;
  }

  componentWillUnmount() {
    document.body.removeEventListener("mousemove", this.onDrag);
    document.body.removeEventListener("mouseup", this.onDragRelease);
  }

  getHandleRef(ref) {
    this.handle = ref;
  }

  getLineRef(ref) {
    this.line = ref;
  }

  calcSliderProgressPercentage() {
    const totalLineWidth = this.lineDimensions.width;
    const handleLeftOffset = extractValueFromTransformStr(this.handle.style.transform);

    return (handleLeftOffset / totalLineWidth) * 100;
  }

  calcSliderProgressInPx() {
    this.lineDimensions = this.line.path.parentElement.getBoundingClientRect();

    return (this.state.percent / 100) * this.lineDimensions.width;
  }

  calcLeftOffset(clientX) {
    const {
      left: lineLeftOffset,
      width: totalLineWidth
    } = this.lineDimensions;

    const leftOffset = clientX - lineLeftOffset;

    if (leftOffset > totalLineWidth) {
      return totalLineWidth;
    } else if (leftOffset < 0) {
      return 0;
    }

    return leftOffset;
  }

  moveHandleLeft(distance) {
    this.handle.style.transform = `translateX(${distance}px)`;
  }

  onDrag({ clientX }) {
    if (!this.lineDimensions) {
      this.lineDimensions = this.line.path.parentElement.getBoundingClientRect();
    }

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
      return;
    }

    if (!this.lineDimensions) {
      this.lineDimensions = this.line.path.parentElement.getBoundingClientRect();
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
      <div
        className="line-slider"
        onMouseDown={this.onSliderPress}
        style={style}
      >
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
  percent: number.isRequired,
  className: string.isRequired,
  strokeColor: string.isRequired,
  style: object.isRequired,
  onProgressChange: func,
};

LineSlider.defaultProps = {
  onProgressChange() {}
};

export default LineSlider;