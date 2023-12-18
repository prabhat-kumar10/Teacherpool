import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import logo from "../assets/teacherpool-logo.svg";
import "../styles/NavBar.css";

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
                Blog
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    exact
                    to="/"
                    className="nav-links"
                    onClick={() => {
                      handleClick();
                      logout();
                    }}
                  >
                    Sign Out
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="logininfo">
                    {" "}
                    {`Welcome ${user?.fullname}`}{" "}
                  </span>
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
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {!click ? (
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                >
                  <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 17h18M3 12h18M3 7h18"
                  />
                </svg>
              </span>
            ) : (
              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                >
                  <path fill="rgba(255, 255, 255, 0)" d="M0 0h24v24H0z" />
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
                    <path
                      fill="currentColor"
                      d="m12 14.121 5.303 5.304a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879 6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.303a1.5 1.5 0 1 0 2.122 2.122L12 14.12Z"
                    />
                  </g>
                </svg>
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
