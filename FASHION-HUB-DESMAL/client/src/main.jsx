import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FavoritesProvider } from "./context/FavoriteContext";
import { BasketProvider } from "./context/BasketContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <FavoritesProvider>
        <BasketProvider >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BasketProvider>
      </FavoritesProvider>
    </UserProvider>
  </React.StrictMode>
);
