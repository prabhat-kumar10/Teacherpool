import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

import { useAuth } from "../AuthContext";
import Jobopenings from "../screens/Jobopenings"
import Blogs from "../screens/Blogs"

import logo from "../images/teacherpool-logo.svg"


function NavBar() {
  const [click, setClick] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">

            <div className="icon">
              <img src={logo} alt="" />
            </div>

            <span>Teacher Pool</span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/jobopenings"

                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Job Openings

              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/blogs"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blogs
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <li>
                    <li className="nav-item">
                    </li>
                    <NavLink
                      exact
                      to="/"
                      activeClassName="active"
                      className="nav-links"
                      onClick={() => {
                        handleClick();
                        logout();
                      }}
                    >
                      Sign Out
                    </NavLink>
                  </li>
                </li>
                <li className="nav-item">
                  <span className="logininfo">{`Welcome ${user?.fullname}`}</span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/signup"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {!click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
