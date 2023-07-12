import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

import SUITThinWoff2 from "./fonts/SUIT-Thin.woff2"
import SUITThinWoff from "./fonts/SUIT-Thin.woff"
import SUITLightWoff2 from "./fonts/SUIT-Light.woff2"
import SUITLightWoff from "./fonts/SUIT-Light.woff"
import SUITRegularWoff2 from "./fonts/SUIT-Regular.woff2"
import SUITRegularWoff from "./fonts/SUIT-Regular.woff"
import SUITMediumWoff2 from "./fonts/SUIT-Medium.woff2"
import SUITMediumWoff from "./fonts/SUIT-Medium.woff"
import SUITSemiBoldWoff2 from "./fonts/SUIT-SemiBold.woff2"
import SUITSemiBoldWoff from "./fonts/SUIT-SemiBold.woff"
import SUITBoldWoff2 from "./fonts/SUIT-Bold.woff2"
import SUITBoldWoff from "./fonts/SUIT-Bold.woff"

const GlobalStyles = createGlobalStyle`
  ${reset}

  // 컬러
  :root {
    --color-primary-500: #FBD617;
    --color-white: #FFF;
    --color-gray-200: #C5C9CE;
    --color-gray-300: #7E7E7E;
    --color-gray-600: #313131;
    --color-gray-700: #272727;
    --color-gray-800: #1C1D1E;
    --color-gray-900: #111112;
    --color-positive-500: #009027;
    --color-positive-100: #A9FFC0;
    --color-negative-500: #FF1E13;
    --color-negative-100: #FFE9E8;
    --color-opacity: rgba(0,0,0,0.8);
  }

  // 폰트
  @font-face {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 100;
    src: local('SUIT Thin'),
    url(${SUITThinWoff2}) format('woff2');
    url(${SUITThinWoff}) format('woff');
  }

  @font-face {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 300;
    src: local('SUIT Light'),
    url(${SUITLightWoff2}) format('woff2');
    url(${SUITLightWoff}) format('woff');
  }

  @font-face {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 400;
    src: local('SUIT Regular'),
    url(${SUITRegularWoff2}) format('woff2');
    url(${SUITRegularWoff}) format('woff'),
  }

  @font-face {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 500;
    src: local('SUIT Medium'),
    url(${SUITMediumWoff2}) format('woff2');
    url(${SUITMediumWoff}) format('woff'),
  }

  @font-face {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 600;
    src: local('SUIT SemiBold'),
    url(${SUITSemiBoldWoff2}) format('woff2');
    url(${SUITSemiBoldWoff}) format('woff');
  }

  @font-face {
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 700;
    src: local('SUIT Bold'),
    url(${SUITBoldWoff2}) format('woff2');
    url(${SUITBoldWoff}) format('woff');
  }

  * {
    box-sizing: border-box;
    font-family: "SUIT", sans-serif;
  }

  body {
    font-family: "SUIT", sans-serif;
    background-color: var(--color-gray-800);
    color: var(--color-white);
  }

  button {
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul {
    list-style: none;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }
`

export default GlobalStyles
