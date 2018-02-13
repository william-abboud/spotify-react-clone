import React from 'react';
import { node, arrayOf, oneOfType } from 'prop-types';

function Nav({ children }) {
  const kids = Array.isArray(children) ? children : [children];

  return (
    <nav>
      <ul>
        {
          kids.map((child, i) => {
            const baseForIndex = 37 + i;
            return <li key={baseForIndex}>{ child }</li>;
          })
        }
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  children: oneOfType([ arrayOf(node), node ]).isRequired
};

export default Nav;