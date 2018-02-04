import classNames from 'classnames';
import React, { Component } from 'react';
import { string } from 'prop-types';
import Sidebar from './views/Sidebar.jsx';
import MainContent from './views/MainContent.jsx';
import Nav from './views/Nav.jsx';
import Breakpoint from './utils/Breakpoint.jsx';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: "dark",
			sidebarOpen: false
		};
	}

	render() {
		return (
			<Breakpoint render={ ({ breakpoint }) => {
				const { theme, sidebarOpen } = this.state;
				const className = classNames("app-wrapper", breakpoint, theme, {
					"sidebar-open": sidebarOpen
				});

				return (
					<div className={className}>
						<Sidebar 
							breakpoint={breakpoint}
							theme={theme}
						>
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

						<MainContent />
					</div>
				);
			}}/>
		);
	}
}

export default App;