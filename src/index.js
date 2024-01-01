import React from  "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Context } from "./store/firebaseContext";
import FirebaseContext from "./store/firebaseContext";
import { db, storage, app } from "./firebase/config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ db, storage, app }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
