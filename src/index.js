import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";

import { DatosProvider } from "./context/Context";

import App from "./App";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    overflow: hidden;
    /* background-color: red; */
  }


`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DatosProvider>
      <GlobalStyle /> {/* //estilos globales */}
      <App />
    </DatosProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <GlobalStyle /> {/* //estilos globales */}
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
