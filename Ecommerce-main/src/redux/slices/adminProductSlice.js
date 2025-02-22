import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch All Products for Admin
export const fetchAllProducts = createAsyncThunk("adminProducts/fetchAllProducts", async () => {
  const response = await fetch("http://localhost:5000/products");
  return response.json();
});

// Add Product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async (newProduct) => {
  const response = await fetch("http://localhost:5000/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  return response.json();
});

// Update Product
export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async ({ id, updatedProduct }) => {
  await fetch(`http://localhost:5000/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedProduct),
  });
  return { id, updatedProduct };
});

// Delete Product
export const removeProduct = createAsyncThunk("adminProducts/removeProduct", async (id) => {
  await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
  return id;
});

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: { adminProducts: [], status: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.adminProducts = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.adminProducts.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.adminProducts.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.adminProducts[index] = action.payload.updatedProduct;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.adminProducts = state.adminProducts.filter((p) => p.id !== action.payload);
      });
  },
});

export default adminProductSlice.reducer;
