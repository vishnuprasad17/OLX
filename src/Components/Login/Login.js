import React, { useState, useContext, useEffect } from "react";
import FirebaseContext from "../../store/firebaseContext";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { app } = useContext(FirebaseContext);
  const[errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      navigate("/");
    }
  }, [app, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="300px" height="300px" src={Logo} alt="Logo"></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            style={{ width: "300px" }}
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            style={{ width: "300px" }}
            type="password"
            id="lname"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        {errorMessage && <bold style={{ fontStyle: "italic", color: "red" }}>{errorMessage}</bold>}
        <p style={{ display: "flex" }}>
          Don't have an account? <NavLink to="/signup">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;