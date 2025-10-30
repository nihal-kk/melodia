import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("melodia_user"));

export const fetchUserRole = createAsyncThunk(
  "auth/fetchUserRole",
  async (email) => {
    const res = await fetch(`https://melodia-data-5.onrender.com/users?email=${email}`);
    const data = await res.json();
    if (data.length > 0) {
      return data[0].role || "user";
    }
    return "user";
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser || null,
    role: null,
    isAuthenticated: !!storedUser,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      const { username, email } = action.payload;
      state.user = { username, email };
      state.isAuthenticated = true;
      localStorage.setItem("melodia_user", JSON.stringify({ username, email }));
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("melodia_user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.role = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserRole.rejected, (state) => {
        state.role = "user";
        state.loading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
