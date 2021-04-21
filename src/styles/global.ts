import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  html, #root {
    height: 100%;
  }
  body {
    height: 100%;
    background: #fcfcfc;
    color: #312E38;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-size: 16;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;
