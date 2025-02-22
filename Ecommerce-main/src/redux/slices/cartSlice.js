// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       state.cartItems.push(action.payload);
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer; 





// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch cart for a specific user
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await fetch(`http://localhost:5000/cart?userId=${userId}`);
  return response.json();
});

// Add to cart and store in db.json
export const addToCart = createAsyncThunk("cart/addToCart", async ({ product, userId }) => {
  // Fetch existing cart for this user
  const cartResponse = await fetch(`http://localhost:5000/cart?userId=${userId}`);
  const cartItems = await cartResponse.json();

  // Check if product exists in cart
  const existingItem = cartItems.find((item) => item.productId === product.id);
  if (existingItem) {
    // Update quantity
    const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
    await fetch(`http://localhost:5000/cart/${existingItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
  } else {
    // Add new product to cart
    await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    });
  }

  // Return updated cart
  return fetch(`http://localhost:5000/cart?userId=${userId}`).then((res) => res.json());
});

// Update quantity in db.json
export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ itemId, newQuantity }) => {
  if (newQuantity < 1) {
    await fetch(`http://localhost:5000/cart/${itemId}`, { method: "DELETE" });
  } else {
    await fetch(`http://localhost:5000/cart/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQuantity }),
    });
  }

  return fetch(`http://localhost:5000/cart`).then((res) => res.json());
});

// Remove item from cart
export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (itemId) => {
  await fetch(`http://localhost:5000/cart/${itemId}`, { method: "DELETE" });
  return fetch(`http://localhost:5000/cart`).then((res) => res.json());
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export default cartSlice.reducer;


