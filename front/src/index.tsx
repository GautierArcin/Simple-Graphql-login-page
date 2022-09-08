import React from "react";

import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { client } from "./apolloConfig";
import UserContextProvider from "./userContext";
import App from "./views/App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
