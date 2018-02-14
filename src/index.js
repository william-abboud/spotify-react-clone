import './main.scss';
import "babel-polyfill";
import 'storm-outliner';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import App from './js/app';

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
  module.hot.accept('./js/app', () => renderApp(App));
}