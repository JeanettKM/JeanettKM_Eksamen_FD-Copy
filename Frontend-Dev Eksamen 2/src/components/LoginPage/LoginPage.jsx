import React from "react";
import LoginForm from "../LoginPage/LoginForm";
import Footer from "../Footer/Footer"; // Import the Footer component
import "../LoginPage/loginPage.css"; // Import the custom CSS for the page

const LoginPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="jumbotron jumbotron-fluid flex-grow-1">
        <div className="container">
          <h1 className="display-4">Welcome to Holidaze</h1>
          <p className="lead">
            Log in to check out our latest selection of hotels and venues.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
