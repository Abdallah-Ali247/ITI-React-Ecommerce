

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { getState }) => {
  const { user } = getState().auth;
  let url = "http://localhost:5000/orders";

  if (user.role === "user") {
    url += `?userId=${user.id}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch orders");
  return await response.json();
});



// Place an order
// export const placeOrder = createAsyncThunk("orders/placeOrder", async ({ userId, cartItems }) => {
//   const orderData = {
//     userId,
//     items: cartItems,
//     status: "pending", // Default order status
//     createdAt: new Date().toISOString(),
//   };

//   // Save order to db.json
//   await fetch("http://localhost:5000/orders", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(orderData),
//   });

//   // Clear the cart after order is placed
//   for (let item of cartItems) {
//     await fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" });
//   }

//   return orderData;
// });


export const placeOrder = createAsyncThunk("orders/placeOrder", async ({ userId, cartItems }, { getState }) => {
  const { products } = getState().products; // Assuming products are stored in Redux state

  const orderItems = cartItems.map((item) => {
    // Find the product in the Redux state to get sellerId
    const product = products.find((p) => p.id === item.id);
    return {
      ...item,
      sellerId: product ? product.sellerId : null, // Attach sellerId
    };
  });

  const orderData = {
    userId,
    items: orderItems,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const response = await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) throw new Error("Failed to place order");

  // Clear the cart after order is placed
  for (let item of cartItems) {
    await fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" });
  }

  return orderData;
});




// Fetch orders for a user
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async (userId) => {
  const response = await fetch(`http://localhost:5000/orders?userId=${userId}`);
  return response.json();
});

// Fetch all orders (for sellers/admin)
export const fetchAllOrders = createAsyncThunk("orders/fetchAllOrders", async () => {
  const response = await fetch("http://localhost:5000/orders");
  return response.json();
});

// Approve an order (for sellers/admin)
export const approveOrder = createAsyncThunk("orders/approveOrder", async (orderId) => {
  await fetch(`http://localhost:5000/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "approved" }),
  });
  return { orderId, status: "approved" };
});

// Reject an order
export const rejectOrder = createAsyncThunk("orders/rejectOrder", async (orderId) => {
  await fetch(`http://localhost:5000/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "rejected" }),
  });
  return { orderId, status: "rejected" };
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false,error: null, },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    })
    .addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    })
    .addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    })
    .addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(approveOrder.fulfilled, (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) order.status = action.payload.status;
    })
    .addCase(rejectOrder.fulfilled, (state, action) => {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) order.status = action.payload.status;
    });
  },
});

export default orderSlice.reducer;


// .addCase(approveOrder.fulfilled, (state, action) => {
//   state.orders = state.orders.map((order) =>
//     order.id === action.payload ? { ...order, status: "approved" } : order
//   );
// })

//***************************************** */




 







 
 