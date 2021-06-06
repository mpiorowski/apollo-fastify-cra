import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient, defaultExchanges, Provider, subscriptionExchange } from "urql";
import { App } from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const subscriptionClient = new SubscriptionClient(`${process.env["REACT_APP_CLIENT_WS"]}/api/subscriptions`, {
  reconnect: true,
});

const client = createClient({
  url: `${process.env["REACT_APP_CLIENT_HTTP"]}/api/graphql`,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ChakraProvider>
        <ColorModeProvider
          options={{
            // useSystemColorMode: true,
            initialColorMode: "dark",
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
