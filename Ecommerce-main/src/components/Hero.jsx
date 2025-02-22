import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="hero-section d-flex align-items-center justify-content-center text-center vh-100">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} className="text-black p-5">
                        <h1 className="display-4 fw-bold">Welcome to Ecommerce</h1>
                        <p className="lead">
                            Discover a wide range of products<br/> at competitive prices. Shop now and enjoy exclusive deals!
                        </p>
                        <Link to="/products" className="btn btn-danger btn-lg mt-3">Start Shopping</Link>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
