import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/MainPage';
import { createGlobalStyle } from 'styled-components';
import { RoomsProvider } from './contexts/RoomsContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <RoomsProvider>
      <GlobalStyle />
      <MainPage />
    </RoomsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
