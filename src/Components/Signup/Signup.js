import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import FirebaseContext from "../../store/firebaseContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
} from "../validation/validate";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { db, app } = useContext(FirebaseContext);

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      navigate("/");
    }
  }, [app, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhoneNumber(phone);
    const isPasswordValid = validatePassword(password);

    setEmailError(!isEmailValid ? "Invalid email" : "");
    setPhoneError(!isPhoneValid ? "Invalid phone number" : "");
    setPasswordError(!isPasswordValid ? "Password must be at least 6 characters" : "");


    if (isEmailValid && isPhoneValid && isPasswordValid) {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email, password).then((result) => {
        updateProfile(result.user, {
          displayName: username,
        }).then(() => {
          setDoc(doc(db, "users", result.user.displayName), {
            id: result.user.uid,
            username: username,
            phone: phone,
          }).then(() => {
            navigate("/login");
          });
        });
      });
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="300px" height="300px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            style={{ width: "300px" }}
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            style={{ width: "300px" }}
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          {emailError && (
            <small style={{ fontStyle: "italic", color: "red" }}>
              {emailError}
            </small>
          )}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            style={{ width: "300px" }}
            className="input"
            type="text"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <br />
          {phoneError && (
            <small style={{ fontStyle: "italic", color: "red" }}>
              {phoneError}
            </small>
          )}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            style={{ width: "300px" }}
            className="input"
            type="password"
            id="lname"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          {passwordError && (
            <small style={{ fontStyle: "italic", color: "red" }}>
              {passwordError}
            </small>
          )}
          <br />
          <button>Signup</button>
        </form>
        <p style={{ display: "flex" }}>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
}
