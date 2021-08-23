import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/MainPage';
import { createGlobalStyle } from 'styled-components';
import { RoomsProvider } from './contexts/RoomsContext';
import { BrowserRouter, Route } from 'react-router-dom';
import PageCallPage from './pages/PageCallPage';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <RoomsProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Route path="/" exact={true} component={MainPage} />
        <Route path="/room" component={PageCallPage} />
      </BrowserRouter>
    </RoomsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
