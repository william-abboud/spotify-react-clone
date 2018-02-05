import React from 'react';

function Header({ children }) {
  return (
    <header className="main-header">
      { children }
    </header>
  );
}

export default Header;