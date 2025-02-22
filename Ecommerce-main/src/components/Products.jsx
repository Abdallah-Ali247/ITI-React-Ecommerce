

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import Rating from "./Rating";
import { Row, Col, ButtonGroup, Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../styles/products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    dispatch(addToCart({ product, userId: user.id }));
    alert("Add to Cart ?")
  };

  const filteredProducts = products
    .filter((product) => selectedCategory === "all" || product.category === selectedCategory)
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const categories = ["all", ...new Set(products.map((product) => product.category))];

  return (
    <div className="container mt-5">
      {/* Category & Search Filters */}
      <Row className="mb-4 justify-content-center">
        <Col md={6} className="text-center">
          <ButtonGroup>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline-danger"}
                className="filter-btn"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="🔍 Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </Col>
      </Row>

      {/* Product List */}
      <h2 className="text-center m-5">🛍️ Explore Our Products</h2>
      <Row className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex">
            <Card className="product-card shadow-sm">
              <Link to={`/products/${product.id}`} className="text-decoration-none text-reset">

                <Card.Img variant="top" src={product.image} className="product-image" />
                <Card.Body className="text-center">
                  <Card.Title className="product-title">{product.name}</Card.Title>
                  <Card.Text className="product-price">${product.price}</Card.Text>
                </Card.Body>
              </Link>
              <div className="text-center">
                <Rating initialRating={product.rating}/>
                <Button className="btn-add-to-cart w-75 my-3" onClick={() => handleAddToCart(product)}>
                  🛒 Add to Cart
                </Button>
              </div>



            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
