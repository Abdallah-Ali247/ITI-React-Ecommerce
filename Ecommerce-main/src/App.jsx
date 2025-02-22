import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProtectedRoute from "./routes/ProtectedRoute";
import OrdersPage from "./pages/OrdersPage";
import AdminPanel from "./pages/AdminPanel";
import AdminProductManager from "./pages/AdminProductManager";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";


const App = () => {
  return (
    <Router>
    <Navbar />

    {/* Wrapping Routes in main-content to ensure proper spacing */}
    <div className="main-content">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} /> 

        <Route element={<ProtectedRoute allowedRoles={["user", "seller", "admin"]} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/products" element={<AdminProductManager />} />

        <Route path="*" element={<h1 className="text-danger text-center mt-5">404 - Page Not Found</h1>} />
      </Routes>
    </div>

    <Footer />
  </Router>
  );
};

export default App;
