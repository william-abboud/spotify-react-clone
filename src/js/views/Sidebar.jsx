import React, { Component } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme, breakpoint, children } = this.props;
    const className = classNames("sidebar", theme);

    return (
      <aside className={className}>
        { children }
      </aside>
    );
  }
}

Sidebar.propTypes = {
  theme: string,
  breakpoint: string,
};

export default Sidebar;