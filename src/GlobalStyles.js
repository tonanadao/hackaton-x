import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
   min-height: 100vh;
  }

  body {
    font-family: 'Poppins';
    font-size: 18px;
    min-height: inherit;
    width: 100%;
      color: white;
  }
  
`;
