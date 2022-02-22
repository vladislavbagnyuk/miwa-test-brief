import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// API at https://graphql.org/swapi-graphql doesn't allow remote connections, so I had to download and run it locally - see https://github.com/graphql/swapi-graphql
// You may have to change the port number here if you want to run it
const client = new ApolloClient({
  uri: "http://localhost:57809/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
