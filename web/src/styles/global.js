// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #0056b3; /* Azul primário */
    --secondary-color: #007bff; /* Azul secundário */
    --text-color: #333; /* Cor do texto */
    --background-color: #eee; /* Cor de fundo */
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: 0;
  }
  
  body, html {
    background: var(--background-color);
    font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    height: 100%;
    width: 100%;
    color: var(--text-color);
  }
  
  button {
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: darken(var(--primary-color), 10%); /* Aplicando um tom mais escuro do azul */
  }
  
  a {
    color: var(--secondary-color);
  }
  
  a:hover {
    color: darken(var(--secondary-color), 10%); /* Aplicando um tom mais escuro do azul secundário */
  }
`;

export default GlobalStyles;
