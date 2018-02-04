import './main.scss';
import "babel-polyfill";
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import App from './js/app.jsx';

const renderApp = (Component) => {
	render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById("root")
	);
};

renderApp(App);

if (module.hot) {
	module.hot.accept('./js/app.jsx', () => renderApp(App));
}