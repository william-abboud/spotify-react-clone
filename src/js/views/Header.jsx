import React from 'react';
import { node, arrayOf, oneOfType } from 'prop-types';

function Header({ children }) {
  return (
    <header className="main-header">
      { children }
    </header>
  );
}

Header.propTypes = {
  children: oneOfType([ arrayOf(node), node ]).isRequired
};

export default Header;