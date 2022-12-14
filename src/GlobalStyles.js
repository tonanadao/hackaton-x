import { createGlobalStyle } from "styled-components";
import { BLACKPEARL } from "./styled/colors";

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
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    min-height: inherit;
    width: 100%;
    color: white;
    background-color: ${BLACKPEARL.toString()};
  }
  
`;
