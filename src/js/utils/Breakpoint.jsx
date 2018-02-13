import { Component } from 'react';
import { func } from 'prop-types';

class Breakpoint extends Component {
  constructor(props) {
    super(props);

    this.breakpointsRanges = {
      "phone": [0, 599],
      "tablet-portrait": [600, 899],
      "tablet-landscape": [900, 1199],
      "dekstop": [1200, 1799],
      "dekstop-large": [1800, 2600]
    };

    this.state = {
      breakpoint: "phone" //mobile-first
    };

    this.getBreakpoint = this.getBreakpoint.bind(this);
    this.setBreakpoint = this.setBreakpoint.bind(this);
  }

  componentDidMount() {
    this.setBreakpoint();
    window.onresize = this.setBreakpoint;
  }

  getBreakpoint() {
    const winWidth = window.innerWidth;
    const breakpoints = Object.keys(this.breakpointsRanges);

    for (const breakpoint of breakpoints) {
      const [min, max] = this.breakpointsRanges[breakpoint];

      if (winWidth >= min && winWidth <= max) {
        return breakpoint;
      }
    }

    return "phone";
  }

  setBreakpoint() {
    const { breakpoint: currentBreakpoint } = this.state;
    const breakpoint = this.getBreakpoint();

    if (breakpoint !== currentBreakpoint) {
      this.setState({ breakpoint });
    }
  }

  render() {
    return this.props.render(this.state);
  }
}

Breakpoint.propTypes = {
  render: func.isRequired,
};

export default Breakpoint;