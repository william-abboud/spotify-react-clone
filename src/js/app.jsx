import classNames from 'classnames';
import React, { Component } from 'react';
import { string, bool, func } from 'prop-types';
import Sidebar from './views/Sidebar';
import MainContent from './views/MainContent';
import Nav from './views/Nav';
import Header from './views/Header';
import Breakpoint from './utils/Breakpoint';
import PlayerWithControls from './views/PlayerWithControls';
import MenuIcon from '!svg-react-loader!../assets/icons/menu.svg';
import CrossIcon from '!svg-react-loader!../assets/icons/cross.svg';
import SpotifyLogoIcon from '!svg-react-loader!../assets/icons/spotify-logo.svg';
import mp3 from '../assets/audio/sample.mp3';

function AppInner({ breakpoint, theme, sidebarOpen, toggleSidebar }) {
  const className = classNames("app-wrapper", breakpoint, theme, {
    "sidebar-open": sidebarOpen
  });

  return (
    <div className={className}>
      <Sidebar breakpoint={breakpoint} theme={theme}>
        <Nav>
          <a href="/browse">Browse</a>
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
        <PlayerWithControls audio={mp3} />
      </MainContent>
    </div>
  );
}

AppInner.propTypes = {
  breakpoint: string.isRequired,
  theme: string.isRequired,
  sidebarOpen: bool.isRequired,
  toggleSidebar: func.isRequired,
};

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
    return <Breakpoint render={this.renderAppInner} />;
  }
}

export default App;