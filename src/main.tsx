import React from "react";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

defineCustomElements(window);
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Auth0Provider
    domain="dev-fisd7t142xuvgoyx.us.auth0.com"
    clientId="vkqGUqzlf9dAIs9o5sMWU6P2cpUYm9e0"
    useRefreshTokens={true}
    useRefreshTokensFallback={false}
    authorizationParams={{
      redirect_uri:
        "io.ionic.starter://dev-fisd7t142xuvgoyx.us.auth0.com/capacitor/io.ionic.starter/callback",
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
