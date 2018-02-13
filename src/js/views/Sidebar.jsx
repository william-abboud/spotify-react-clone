import React from 'react';
import { string, oneOfType, arrayOf, node } from 'prop-types';
import classNames from 'classnames';

function Sidebar({ theme, children }) {
  const className = classNames("sidebar", theme);

  return <aside className={className}>{children}</aside>;
}

Sidebar.propTypes = {
  theme: string.isRequired,
  children: oneOfType([ arrayOf(node), node ]).isRequired
};

export default Sidebar;