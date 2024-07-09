// RegisterForm.jsx

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../API/AuthAPI";

const RegisterForm = () => {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false); // State for venue manager checkbox
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reset previous error messages
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setApiError("");

      // Validate name
      if (!name) {
        setNameError("Name is required");
        return;
      }

      // Validate email
      if (!email) {
        setEmailError("Email is required");
        return;
      }

      // Check email restriction for venue manager status
      if (venueManager && !email.endsWith("@stud.noroff.no")) {
        setEmailError(
          "Only students from noroff.no can register as a Venue Manager"
        );
        return;
      }

      // Validate password
      if (!password) {
        setPasswordError("Password is required");
        return;
      }

      // Register the user
      const response = await registerUser({
        name,
        email,
        password,
        venueManager,
      });
      console.log("Registration Response:", response);

      // Check if registration is successful
      if (response && response.data && response.data.email) {
        console.log("Registration successful!");
        setRegistered(true); // Show the registration success popup
      } else if (response && response.errors && response.errors.length > 0) {
        setApiError(response.errors[0].message);
      } else {
        console.error("Registration failed:", response);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      if (registered) {
        setRegistered(true);
      }
    }
  };

  /**
   * Redirects to the login page.
   */
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="inputWidth">
          {/* Name Input */}
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

          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Venue Manager Checkbox */}
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

        {/* Register btn */}
        <Button variant="primary" type="submit">
          Register
        </Button>
        <div>
          <br />
          <Form.Text className="text-muted">
            Already have an account? Log in!
          </Form.Text>
          {/* Login btn */}
          <Link to="/login">
            <Button className="register-button" variant="primary">
              Log in
            </Button>
          </Link>
        </div>
      </Form>

      {/* Registration Popup */}
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
