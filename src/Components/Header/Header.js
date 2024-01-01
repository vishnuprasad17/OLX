import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";


import FirebaseContext, { authContext } from "../../store/firebaseContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Header() {
  const { user, setUser } = useContext(authContext);

  const { app } = useContext(FirebaseContext);

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [user]);
  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span>{`Welcome ${user?.displayName}`}</span>
          ) : (
            <span
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              Login
            </span>
          )}
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              signOut(auth);
              navigate("/login");
            }}
            style={{ color: "red", cursor: "pointer" }}
          >
            Logout
          </span>
        )}


        <div onClick={()=>{navigate('/create')}} style={{ cursor: "pointer" }} className="sellMenu">
          {user && <SellButton></SellButton>}
          {user && <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>}
        </div>

      </div>
    </div>
  );
}

export default Header;
