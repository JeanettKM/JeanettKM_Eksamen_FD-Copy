import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="py-3 my-4">
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <Link to="/venues" className="nav-link px-2 text-primary">
            Venues
          </Link>
        </li>
        <li>
          <Link to="/user" className="nav-link px-2">
            Your Profile
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link px-2">
            Contact Us
          </Link>
        </li>
      </ul>
      <p className="text-center text-body-secondary">© 2024 Holidaze, Inc</p>
    </footer>
  );
};

export default Footer;
