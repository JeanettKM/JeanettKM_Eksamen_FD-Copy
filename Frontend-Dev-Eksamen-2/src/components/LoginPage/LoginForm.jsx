import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, createApiKey } from "../API/AuthAPI";

const LoginForm = () => {
  // State variables for email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Reset previous error messages
      setEmailError("");
      setPasswordError("");
      setApiError("");

      // Validate email
      if (!email) {
        setEmailError("Email is required");
        return;
      }

      // Validate password
      if (!password) {
        setPasswordError("Password is required");
        return;
      }

      // Call the loginUser function to log in the user
      const response = await loginUser(email, password);
      console.log("Login API Response:", response); // Log the API response for debugging

      // Check if the response contains user data
      if (response && response.data && response.data.accessToken) {
        // Save access token and user data to local storage
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);

        // If the user logs in successfully, create an API key
        const apiKeyResponse = await createApiKey(response.data.accessToken);
        if (apiKeyResponse && apiKeyResponse.data && apiKeyResponse.data.key) {
          // Save API key to local storage
          localStorage.setItem("apiKey", apiKeyResponse.data.key);
        }

        console.log("Login successful!");

        // Redirect to the venues page if successfully logged in
        navigate("/venues");
      } else if (response && response.errors && response.errors.length > 0) {
        // Display and render API error message if any errors are present
        setApiError(response.errors[0].message);
      } else {
        console.error("Login failed:", response);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Function to set test user credentials
  const setTestUser = () => {
    setEmail("Testjkm@stud.noroff.no");
    setPassword("Abcd1234");
  };

  return (
    <div>
      <br />
      {/* Button to set test user credentials */}
      <Button
        variant="secondary"
        className="custom-test-user-button"
        onClick={setTestUser}
      >
        Fill Test User
      </Button>
      <Form>
        <div className="inputWidth">
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Display error message */}
          {apiError && (
            <Form.Text className="text-danger">{apiError}</Form.Text>
          )}

          <Form.Text className="text-muted">
            We'll never share your information with anyone else.
          </Form.Text>
        </div>
        <br />

        {/* Login btn */}
        <Button variant="primary" type="button" onClick={handleLogin}>
          Log in
        </Button>

        {/* Register btn */}
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
