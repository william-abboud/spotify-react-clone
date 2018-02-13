import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

function Sidebar({ theme, children }) {
  const className = classNames("sidebar", theme);

  return <aside className={className}>{children}</aside>;
}

Sidebar.propTypes = {
  theme: string.isRequired,
};

export default Sidebar;