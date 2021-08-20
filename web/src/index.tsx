import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/MainPage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <MainPage />
  </React.StrictMode>,
  document.getElementById('root'),
);
