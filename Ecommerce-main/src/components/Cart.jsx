import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartQuantity, removeCartItem } from "../redux/slices/cartSlice";
import { placeOrder } from "../redux/slices/orderSlice";



const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);




    useEffect(() => {
        if (user) {
            dispatch(fetchCart(user.id));
        }
    }, [dispatch, user]);

    const handleQuantityChange = (item, change) => {
        dispatch(updateCartQuantity({ itemId: item.id, newQuantity: item.quantity + change }));
    };

    const handleRemove = (itemId) => {
        dispatch(removeCartItem(itemId));
    };



    const handleCheckout = async () => {
        await dispatch(placeOrder({ userId: user.id, cartItems }));
        dispatch(fetchCart(user.id));  
      };



    if (!user) return <p>Please log in to view your cart.</p>;
    if (cartItems.length === 0) return <p className="text-center text-danger m-5 fs-5">Your cart is empty.</p>;

    // Calculate total price dynamically
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <div className="container mt-5 ">
            <h2 className="text-center mb-4"> Your Shopping Cart</h2>

            <div className="cart-container ">
                {cartItems.map((item) => (
                    <div key={item.id} className="card cart-item ">
                        <img src={item.image} alt={item.name} className="cart-img" />
                        <div className="cart-info">
                            <h5 className="cart-title">{item.name}</h5>
                            <p className="cart-price text-muted fw-bold">${Number(item.price).toFixed(2)}</p>
                            <div className="cart-quantity">
                                <button className="btn btn-sm btn-outline-success" onClick={() => handleQuantityChange(item, -1)}>-</button>
                                <span className="mx-3">{item.quantity}</span>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleQuantityChange(item, 1)}>+</button>
                            </div>
                            <button className="btn btn-danger btn-sm mt-3" onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h3 className="fw-bold m-5">Total: ${totalPrice.toFixed(2)}</h3>
                <button className="btn btn-primary btn-lg cart-btn" onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );


    // return (
    //     <div className="container mt-5">
    //         <h2>Your Cart</h2>
    //         {cartItems.length === 0 ? (
    //             <p>Your cart is empty.</p>
    //         ) : (
    //             <div>
    //                 {cartItems.map((item) => (
    //                     <div key={item.id} className="d-flex justify-content-between align-items-center border p-3 mb-2">
    //                         <div>
    //                             <h5>{item.name}</h5>
    //                             <p>Price: ${item.price} | Quantity: {item.quantity}</p>
    //                         </div>
    //                         <button className="btn btn-danger" onClick={() => handleRemove(item.id)}>
    //                             Remove
    //                         </button>
    //                     </div>
    //                 ))}
    //                 <button className="btn btn-warning mt-3" onClick={handleClearCart}>
    //                     Clear Cart
    //                 </button>
    //             </div>
    //         )}
    //     </div>
    // );
};

export default Cart;








