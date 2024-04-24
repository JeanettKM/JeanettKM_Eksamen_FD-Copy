import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div>
      <Form>
        <div className="inputWidth">
          <Form.Group className="loginForm" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <br />

          <Form.Group className="sm-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group
            className="sm-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <br />
        </div>

        <Link to="/venues">
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Link>
        <div>
          <br />
          <Form.Text className="text-muted">
            Already have a account? Log in!
          </Form.Text>
          <Link to="/login">
            <Button className="register-button" variant="primary" type="submit">
              Log in
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
