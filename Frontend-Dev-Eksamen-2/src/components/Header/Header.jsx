import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all stored data in local storage
    localStorage.clear();
    // Redirect to the login page
    navigate("/login");
  };

  // Check if user is logged in by checking if accessToken exists in local storage
  const isLoggedIn = localStorage.getItem("accessToken") !== null;

  return (
    <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <p>Holidaze</p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor04"
          aria-controls="navbarColor04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor04">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/venues">
                Venues
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn && (
                <Link className="nav-link" to="/user">
                  Your Profile
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact us
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
              <button
                className="btn btn-outline-primary me-2 btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-primary me-2 btn-sm">
                Login
              </Link>
            )}
            <Link
              to="/register"
              id="registerBtn"
              // Hide Register button if user is logged in
              className={`btn btn-primary btn-sm ${isLoggedIn ? "d-none" : ""}`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
