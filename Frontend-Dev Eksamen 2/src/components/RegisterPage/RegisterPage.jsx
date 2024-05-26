import React from "react";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Welcome to Holidaze</h1>
          <p className="lead">
            Register a account to check out our selection of hotels and venues.
          </p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
