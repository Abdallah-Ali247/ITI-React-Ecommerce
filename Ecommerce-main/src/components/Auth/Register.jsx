import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginSuccess } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser) {
      navigate("/");
    }

  }, []);

  // Name validation function
  const validateName = (name) => /^[a-zA-Z\s]{2,}$/.test(name); // Only letters & spaces, at least 2 characters

  // Email validation function
  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/.test(email);

  // Password validation function
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validate inputs
    if (!validateName(formData.name)) {
      setError("Invalid name! It must contain only letters and be at least 2 characters long.");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Invalid email! Must be in correct format and end with .com.");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 6 characters, contain uppercase and lowercase letters, and include at least one number."
      );
      return;
    }

    try {
      //  Fetch all users from db.json
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();

      //  Check if email already exists
      const emailExists = users.some((user) => user.email === formData.email);
      if (emailExists) {
        setError("This email is already registered. Please use a different email.");
        return;
      }

      //  Check if password is already in use (optional)
      // const passwordExists = users.some((user) => user.password === formData.password);
      // if (passwordExists) {
      //   setError("This password is already in use. Please choose a different one.");
      //   return;
      // }

      setError(""); //  Clear error if valid

      //  Register new user
      dispatch(registerUser(formData)).then(() => {
        dispatch(loginSuccess(formData));
        navigate("/")
      }
      );
    } catch (error) {
      console.error("Error checking user uniqueness:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="p-4 shadow-sm">
            <Card.Title as="h2" className="text-center mb-4">Register</Card.Title>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Name Input */}
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  isInvalid={error.includes("name")}
                />
              </Form.Group>

              {/* Email Input */}
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  isInvalid={error.includes("email")}
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  isInvalid={error.includes("Password")}
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-3">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="text-primary">Login here</a>
                </p>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
