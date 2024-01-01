import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";

import Post from "./store/PostContext";
import FirebaseContext, { authContext } from "./store/firebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const { setUser } = useContext(authContext);

  const { app } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    
  });

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
