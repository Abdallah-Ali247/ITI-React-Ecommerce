// src/components/Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TiSocialFacebookCircular, TiSocialTwitter, TiSocialInstagram } from "react-icons/ti";
 const Footer = () => {
  return (
    <footer className="  py-4 mt-5">
      <Container>
        <Row>
          {/* Column 1: Links */}
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Welcome to our Ecommerce platform! We offer a wide range of products
              at competitive prices.
            </p>
          </Col>

          {/* Column 2: Contact Info */}
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@example.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </Col>

          {/* Column 3: Social Media */}
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex gap-2">
              <li>
                <a href="#" className="text-white text-decoration-none">
                <TiSocialFacebookCircular /> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                <TiSocialTwitter /> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  <TiSocialInstagram /> Instagram
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Copyright */}
        <hr />
        <p className="text-center">&copy; 2025 Ecommerce. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;