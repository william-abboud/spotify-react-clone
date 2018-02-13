import React from 'react';
import { node, arrayOf, oneOfType } from 'prop-types';

function Main({ children }) {
  return (
    <main className="main-content">
      {children}
    </main>
  );
}

Main.propTypes = {
  children: oneOfType([ arrayOf(node), node ]).isRequired
};

export default Main;