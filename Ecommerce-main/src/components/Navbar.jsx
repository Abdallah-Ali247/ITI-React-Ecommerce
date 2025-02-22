import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";


const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigat = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigat("/")
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Brand (Fixed FontAwesome Icon Visibility) */}
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          <FontAwesomeIcon icon={faShop} className="me-2 text-white" /> Ecommerce
        </Navbar.Brand>

        {/* Toggle Button for Small Screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-5">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/cart">Cart</Nav.Link>
            <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>

            {/* Admin Links */}
            {user && ["admin", "seller"].includes(user.role) && (
              <Nav.Link as={NavLink} to="/admin/products">Product Manager</Nav.Link>
            )}
            {user && user.role === "admin" && (
              <Nav.Link as={NavLink} to="/admin">Admin Panel</Nav.Link>
            )}
          </Nav>

          {/* Authentication Links */}
          <Nav className="ms-auto">
            {user ? (
              <NavDropdown title={user.name} id="navbar-dropdown">
                <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
