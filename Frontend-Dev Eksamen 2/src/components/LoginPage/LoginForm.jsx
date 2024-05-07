// LoginForm.jsx

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { loginUser, createApiKey } from "../API/AuthAPI";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const handleLogin = async () => {
    try {
      // Reset previous error messages
      setEmailError("");
      setPasswordError("");
      setApiError("");

      // Validate input email
      if (!email) {
        setEmailError("Email is required");
        return;
      }

      // Validate input password
      if (!password) {
        setPasswordError("Password is required");
        return;
      }

      // Call the loginUser function to log in user
      const response = await loginUser(email, password);
      console.log("Login API Response:", response); // Log the API response for debugging

      // Check if the response contains user data
      if (response && response.data && response.data.accessToken) {
        // Save access token to local storage
        localStorage.setItem("accessToken", response.data.accessToken);

        // Save user data to local storage
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);

        // If login successful, create API key
        const apiKeyResponse = await createApiKey(response.data.accessToken);
        if (apiKeyResponse && apiKeyResponse.data && apiKeyResponse.data.key) {
          // Save API key to local storage
          localStorage.setItem("apiKey", apiKeyResponse.data.key);
        }

        // Console log login success
        console.log("Login successful!");

        // Redirect to venues page after successful login - CHANGE THIS TO USER PAGE WHEN ITS CREATED
        window.location.href = "/venues";
      } else if (response && response.errors && response.errors.length > 0) {
        // Display API error message if any errors are present
        setApiError(response.errors[0].message);
      } else {
        console.error("Login failed:", response);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <br />
      <Form>
        <div className="inputWidth">
          <Form.Group className="loginForm" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            {passwordError && (
              <Form.Text className="text-danger">{passwordError}</Form.Text>
            )}
          </Form.Group>
          <Form.Group
            className="sm-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          {apiError && (
            <Form.Text className="text-danger">{apiError}</Form.Text>
          )}
          <Form.Text className="text-muted">
            We'll never share your information with anyone else.
          </Form.Text>
        </div>
        <br />
        <Button variant="primary" type="button" onClick={handleLogin}>
          Log in
        </Button>
        <Link to="/register">
          <Button className="register-button" variant="primary">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default LoginForm;
