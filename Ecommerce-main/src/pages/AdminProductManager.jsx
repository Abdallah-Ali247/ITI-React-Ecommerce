import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, createProduct, updateProduct, removeProduct } from "../redux/slices/adminProductSlice";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Card, Row, Col, Container } from "react-bootstrap";

const AdminProductManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const { adminProducts } = useSelector((state) => state.adminProducts);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", image: "" });
    const [editData, setEditData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        if (!storedUser || !["admin", "seller"].includes(storedUser.role)) {
            navigate("/");
        }
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleAddProduct = () => {
        dispatch(createProduct(newProduct));
        setNewProduct({ name: "", price: "", category: "", image: "" });
        setShowAddModal(false);
    };

    const handleEdit = (product) => {
        setEditData(product);
        setShowModal(true);
    };

    const handleSaveChanges = () => {
        dispatch(updateProduct({ id: editData.id, updatedProduct: editData }));
        setShowModal(false);
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">🛍️ Admin - Manage Products</h2>

            {/* Add Product Button */}
            <div className="text-end mb-3">
                <Button variant="success" onClick={() => setShowAddModal(true)}>➕ Add Product</Button>
            </div>

            {/* Product Grid */}
            <Row>
                {adminProducts.map((product) => (
                    <Col key={product.id} md={4} lg={3} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Img variant="top" src={product.image} alt={product.name} style={{ height: "200px", objectFit: "cover" }} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <strong>Price:</strong> ${product.price} <br />
                                    <strong>Category:</strong> {product.category}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="success" size="sm" onClick={() => handleEdit(product)}>✏️ Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => dispatch(removeProduct(product.id))}>🗑️ Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Add Product Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setNewProduct({ ...newProduct, image: URL.createObjectURL(file) });
                                }
                            }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button variant="success" onClick={handleAddProduct}>Add Product</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Product Modal */}
            {editData && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" value={editData.price} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" value={editData.category} onChange={(e) => setEditData({ ...editData, category: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setEditData({ ...editData, image: URL.createObjectURL(file) });
                                    }
                                }} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default AdminProductManager;
