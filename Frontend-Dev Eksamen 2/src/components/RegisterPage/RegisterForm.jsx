// RegisterForm.jsx

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../API/AuthAPI";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false); // New state for venue manager
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setApiError("");

      if (!name) {
        setNameError("Name is required");
        return;
      }

      if (!email) {
        setEmailError("Email is required");
        return;
      }

      if (venueManager && !email.endsWith("@stud.noroff.no")) {
        setEmailError(
          "Only students from noroff.no can register as a Venue Manager"
        );
        return;
      }

      if (!password) {
        setPasswordError("Password is required");
        return;
      }

      const response = await registerUser({
        name,
        email,
        password,
        venueManager,
      });
      console.log("Registration Response:", response);

      if (response && response.email) {
        console.log("Registration successful!");
        setRegistered(true);
      } else if (response && response.errors && response.errors.length > 0) {
        setApiError(response.errors[0].message);
      } else {
        console.error("Registration failed:", response);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleClosePopup = () => {
    setRegistered(false);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="inputWidth">
          <Form.Group className="loginForm" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError && (
              <Form.Text className="text-danger">{nameError}</Form.Text>
            )}
          </Form.Group>
          <br />

          <Form.Group className="loginForm" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <Form.Text className="text-danger">{emailError}</Form.Text>
            )}
          </Form.Group>
          <br />

          <Form.Group className="sm-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && (
              <Form.Text className="text-danger">{passwordError}</Form.Text>
            )}
          </Form.Group>
          <br />

          <Form.Group className="sm-3" controlId="formBasicVenueManager">
            <Form.Check
              type="checkbox"
              label="Register as Venue Manager"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
            />
          </Form.Group>
          <br />
        </div>
        {apiError && <Form.Text className="text-danger">{apiError}</Form.Text>}

        <Button variant="primary" type="submit">
          Register
        </Button>
        <div>
          <br />
          <Form.Text className="text-muted">
            Already have an account? Log in!
          </Form.Text>
          <Link to="/login">
            <Button className="register-button" variant="primary">
              Log in
            </Button>
          </Link>
        </div>
      </Form>

      {registered && <div className="overlay"></div>}
      {registered && (
        <div className="popup">
          <p>Welcome to Holidaze, please log in with your new account!</p>
          <Button onClick={handleLoginRedirect}>OK</Button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
