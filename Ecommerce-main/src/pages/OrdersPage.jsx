import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders, fetchAllOrders, approveOrder } from "../redux/slices/orderSlice";
import { FaCheckCircle, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate('/login')
    
    if (user?.role === "seller" || user?.role === "admin") {
      dispatch(fetchAllOrders());
    } else if (user) {
      dispatch(fetchUserOrders(user.id));
    }
  }, [dispatch, user]);

  const handleApprove = (orderId) => {
    dispatch(approveOrder(orderId));
  };



  if (orders.length === 0)
    return <p className="text-center text-warning mt-4">No orders available.</p>;

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { background: "#FFD166", color: "#333" };
      case "approved":
        return { background: "#06D6A0", color: "white" };
      case "shipped":
        return { background: "#118AB2", color: "white" };
      case "delivered":
        return { background: "#073B4C", color: "white" };
      case "cancelled":
        return { background: "#EF476F", color: "white" };
      default:
        return { background: "#FF1493", color: "white" };
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center" style={{ color: "#FF6B6B", fontFamily: "Comic Sans MS, sans-serif", fontWeight: "bold" }}>
        <FaBoxOpen /> Order Wonderland
      </h2>
      <div className="row">
        {orders.map((order) => (
          <div key={order.id} className="col-md-6 col-lg-4">
            <div
              className="card shadow-sm mb-4"
              style={{
                borderRadius: "15px",
                backgroundColor: "#FFE8D6",
                padding: "20px",
                color: "#333",
                transition: "0.3s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "100%",
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: "#6D597A", fontWeight: "bold" }}>
                  {order.name || `Order #${order.id}`}
                </h5>
                <p className="card-text" style={{ fontSize: "16px", color: "#4A4E69" }}>
                  Items: {order.items.length}
                </p>
                <p
                  className="card-text badge"
                  style={{ ...getStatusStyle(order.status), padding: "10px", borderRadius: "10px", fontSize: "14px" }}
                >
                  {order.status}
                </p>

                {user.role === "seller" && order.status === "pending" && (
                  <button
                    className="btn w-100"
                    style={{
                      background: "#FF9F1C",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      transition: "0.3s",
                    }}
                    onClick={() => handleApprove(order.id)}
                    onMouseOver={(e) => e.target.style.background = "#B22222"}
                    onMouseOut={(e) => e.target.style.background = "#FF9F1C"}
                  >
                    <FaCheckCircle className="text-light fs-3" /> Approve Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
