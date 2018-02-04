import React from 'react';

function Nav({ children }) {
  const kids = Array.isArray(children) ? children : [children];

  return (
    <nav>
      <ul>
        {
          kids.map((child, i) => (
            <li key={i}>
              { child }
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

export default Nav;