import classNames from 'classnames';
import React, { Component } from 'react';
import { string } from 'prop-types';
import Sidebar from './views/Sidebar.jsx';
import MainContent from './views/MainContent.jsx';
import Nav from './views/Nav.jsx';
import Header from './views/Header.jsx';
import Breakpoint from './utils/Breakpoint.jsx';
import MenuIcon from '!svg-react-loader!../assets/icons/menu.svg';
import CrossIcon from '!svg-react-loader!../assets/icons/cross.svg';
import SpotifyLogoIcon from '!svg-react-loader!../assets/icons/spotify-logo.svg';

function AppInner({ breakpoint, theme, sidebarOpen, toggleSidebar }) {
  const className = classNames("app-wrapper", breakpoint, theme, {
        "sidebar-open": sidebarOpen
  });
  
  return (
    <div className={className}>
      <Sidebar breakpoint={breakpoint} theme={theme}>
        <Nav>
          <a href="#">Browse</a>
        </Nav>

        <h4>Your library</h4>
        <Nav>
          <a href="#">Recently played</a>
          <a href="#">Your Songs</a>
        </Nav>

        <h4>Playlists</h4>
        <Nav>
          <a href="#">Workout</a>
        </Nav>
      </Sidebar>

      <MainContent>
        <Header>
          <button onClick={toggleSidebar} className="menu-trigger">
            {
              sidebarOpen
                ? <CrossIcon className="close-icon" />
                : <MenuIcon className="menu-icon" />
            }
        </button>

        <a href="/" className="logo">
          <SpotifyLogoIcon className="spotify-logo-icon" />
        </a>
        </Header>
      </MainContent>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "dark",
      sidebarOpen: false
    };

    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.renderAppInner = this.renderAppInner.bind(this);
  }

  toggleSidebar() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  renderAppInner({ breakpoint }) {
    return (
      <AppInner
        breakpoint={breakpoint} 
        toggleSidebar={this.toggleSidebar}
        {...this.state}
       />
    );
  }

  render() {
    return (
      <Breakpoint render={ this.renderAppInner } />
    );
  }
}

export default App;