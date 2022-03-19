import React, { useState } from "react";

import "../style/Navbar.scss";
import { Link } from "react-router-dom";

//connect MetaMask Wallet

const Navbar = ({ connectWallet, wallet }) => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <Link to="/">
            <span>Home</span>
          </Link>
          <span>Jobs</span>
          <span>Podcasst</span>
          <span>About</span>
        </div>

        <div className="navbar__right">
          {!wallet ? (
            <button onClick={connectWallet}>Post a Job</button>
          ) : (
            <Link to="postajob">
              <button>Post a Job</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
