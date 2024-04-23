import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link
            to="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <svg
              className="bi"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlink:href="#bootstrap"></use>
            </svg>
          </Link>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/venues" className="nav-link px-2 link-secondary">
              Venues
            </Link>
          </li>
          <li>
            <Link to="/user" className="nav-link px-2">
              Your Profile
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link px-2">
              Contact us
            </Link>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <Link to="/login" className="btn btn-outline-primary me-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Sign-up
          </Link>
        </div>
      </header>

      {/* <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Holidaze</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/venues#venueOverview">
                Venues
              </Nav.Link>
              <Nav.Link as={Link} to="/cart#cartPage">
                Cart
              </Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user#userPage">
                  Your Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders#orders">
                  Your Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/login#loginPage">
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </div>
  );
};

export default Header;
