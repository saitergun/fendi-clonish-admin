import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import {
  FocusStyleManager,
} from '@blueprintjs/core';

import './style/scss/index.scss';
import './style/css/tw.css';

import { StoreProvider } from './store';

import App from './component/App';

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <StoreProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </StoreProvider>,
  document.getElementById('root'),
);
