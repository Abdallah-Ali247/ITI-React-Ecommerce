// src/components/ProductDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const product = products.find((p) => p.id === id);

    if (!product) {
        return <h2 className="text-center mt-5">Product not found</h2>;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const handleAddToCart = (product) => {
        if (!storedUser) {
            alert("Please log in first!");
            return;
        }
        dispatch(addToCart({ product, userId: storedUser.id }));
        alert("Add to Cart ?")
    };

    return (
        <Container className="mt-5">
            <Row>
                {/* Product Image */}
                <Col md={6} className="d-flex justify-content-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid"
                        style={{ maxWidth: "50%", borderRadius: "10px" }}
                    />
                </Col>

                {/* Product Details */}
                <Col md={6}>
                    <Card className="shadow-sm p-4"
                    style={{ minHeight: "100%", borderRadius: "10px" , textAlign:"center"}}
                    >
                        <Card.Title as="h2" className="mb-3">
                            {product.name}
                        </Card.Title>
                        <Card.Text className="lead mb-3">${product.price}</Card.Text>
                        <Card.Text>{product.description || "No description available."}</Card.Text>

                        {/* Add to Cart Button */}
                        <Button className="btn-add-to-cart mt-2" onClick={() => handleAddToCart(product)}>
                            🛒 Add to Cart
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;