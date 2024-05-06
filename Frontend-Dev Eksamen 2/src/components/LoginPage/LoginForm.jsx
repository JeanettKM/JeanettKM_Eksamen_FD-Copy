import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { loginUser, createApiKey } from "../API/AuthAPI";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Call loginUser function to log in user
      const response = await loginUser(email, password);
      if (response && response.data && response.data.accessToken) {
        // Save access token to local storage
        localStorage.setItem("accessToken", response.data.accessToken);

        // If login successful, create API key
        const apiKeyResponse = await createApiKey(response.data.accessToken);
        if (apiKeyResponse && apiKeyResponse.data && apiKeyResponse.data.key) {
          // Save API key to local storage
          localStorage.setItem("apiKey", apiKeyResponse.data.key);
        }

        // Redirect to venues page or perform any other action after successful login
        window.location.href = "/venues";
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
          </Form.Group>
          <br />

          <Form.Group className="sm-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="sm-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
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
