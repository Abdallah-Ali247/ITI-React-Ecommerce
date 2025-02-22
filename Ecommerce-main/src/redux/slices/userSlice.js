// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   users: [],
// };

// const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     setUsers: (state, action) => {
//       state.users = action.payload;
//     },
//     addUser: (state, action) => {
//       state.users.push(action.payload);
//     },
//     updateUser: (state, action) => {
//       const index = state.users.findIndex(user => user.id === action.payload.id);
//       if (index !== -1) {
//         state.users[index] = action.payload;
//       }
//     },
//     deleteUser: (state, action) => {
//       state.users = state.users.filter(user => user.id !== action.payload);
//     },
//   },
// });

// export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
// export default userSlice.reducer;  




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("http://localhost:5000/users");
  return response.json();
});

// Add a new user
export const addUser = createAsyncThunk("users/addUser", async (newUser) => {
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
  return response.json();
});

// Edit user details
export const editUser = createAsyncThunk("users/editUser", async ({ id, updatedUser }) => {
  await fetch(`http://localhost:5000/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  return { id, updatedUser };
});



// Delete a user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
  return id;
});

// Change user role
export const changeUserRole = createAsyncThunk("users/changeUserRole", async ({ id, newRole }) => {
  await fetch(`http://localhost:5000/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: newRole }),
  });
  return { id, newRole };
});



const userSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload.updatedUser;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(changeUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) state.users[index].role = action.payload.newRole;
      });
  },
});

export default userSlice.reducer;
