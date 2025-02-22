import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";



const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser) {
      navigate("/");
    }
    
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Email Validation
    if (!validateEmail(email)) {
      setError("Invalid email! Must be in correct format and end with .com.");
      return;
    }

    // Password Validation
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters, contain uppercase and lowercase letters, and include at least one number."
      );
      return;
    }

    setError(""); //Clear error if valid

    // Fetch users from db.json
    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();

      // Find user in the database
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        dispatch(loginSuccess(user)); // Store user in Redux & localStorage
        navigate("/"); // Redirect to home page
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Server error! Please try again later.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="p-4 shadow-sm login-card">
            <Card.Title as="h2" className="text-center mb-4">Login</Card.Title>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              {/* Email Input */}
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={error.includes("email")}
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  isInvalid={error.includes("Password")}
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">Login</Button>
              </div>

              {/* Register Link */}
              <div className="text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <a href="/register" className="text-primary">Register here</a>
                </p>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
