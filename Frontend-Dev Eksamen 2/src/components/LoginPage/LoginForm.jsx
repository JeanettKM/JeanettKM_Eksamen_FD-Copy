import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div>
      <br />
      <Form>
        <Form.Group className="loginForm" controlId="formBasicEmail">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <br />

        <Form.Group className="sm-3" controlId="formBasicPassword">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="sm-3" controlId="formBasicCheckbox"></Form.Group>
        <Form.Text className="text-muted">
          We'll never share your information with anyone else.
        </Form.Text>
        <br />
        <Link to="/venues">
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Link>
        <Link to="/register">
          <Button className="register-button" variant="primary" type="submit">
            Register
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default LoginForm;
