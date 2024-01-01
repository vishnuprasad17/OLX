import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";

import Post from "./store/PostContext";
import FirebaseContext, { authContext } from "./store/firebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const { user, setUser } = useContext(authContext);
  const { app } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    });
  }, [app, setUser]);

  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {!user && <Route path="/signup" element={<Signup />} />}
            {!user && <Route path="/login" element={<Login />} />}
            {user && <Route path="/create" element={<Create />} />}
            <Route path="/view" element={<View />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/create" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;