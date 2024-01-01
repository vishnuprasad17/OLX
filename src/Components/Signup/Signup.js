import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import Logo from "../../olx-logo.png";
import "./Signup.css";

import FirebaseContext from "../../store/firebaseContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";


export default function Signup() {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const { db, app } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="300px" height="300px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
          style={{width:"300px"}}
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
          style={{width:"300px"}}
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
          style={{width:"300px"}}
            className="input"
            type="text"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          style={{width:"300px"}}
            className="input"
            type="password"
            id="lname"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <p style={{display:"flex"}}>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
}
