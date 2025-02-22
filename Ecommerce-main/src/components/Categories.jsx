// src/components/Categories.jsx
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    { id: 1, name: "Electronics", image: "/products/elc.avif" },  
    { id: 2, name: "Clothing", image: "/products/clothes.jpg" },  
    { id: 3, name: "Books", image: "/products/books.jpg" },  
  ];

  return (
    <section className="categories-section py-5">
      <Container>
        <h2 className="text-center mb-4">Shop by Category</h2>
        <Row>
          {categories.map((category) => (
            <Col key={category.id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={category.image} className="card-img-top h-75" />
                <Card.Body className="text-center">
                  <Card.Title>{category.name}</Card.Title>
                  
                  <Link to="/products" className="btn btn-outline-danger w-100">Explore</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Categories;