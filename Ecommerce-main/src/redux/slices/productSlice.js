// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     setProducts: (state, action) => {
//       state.products = action.payload;
//     },
//     addProduct: (state, action) => {
//       state.products.push(action.payload);
//     },
//     updateProduct: (state, action) => {
//       const index = state.products.findIndex(p => p.id === action.payload.id);
//       if (index !== -1) {
//         state.products[index] = action.payload;
//       }
//     },
//     deleteProduct: (state, action) => {
//       state.products = state.products.filter(p => p.id !== action.payload);
//     },
//   },
// });

// export const { setProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;
// export default productSlice.reducer;  



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products from JSON server
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("http://localhost:5000/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return await response.json();
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;



/* ********************************************** */

