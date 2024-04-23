import React from "react";
import LoginForm from "./LoginForm";
import "./loginPage.css";

const LoginPage = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
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
