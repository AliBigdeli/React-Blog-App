import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken,unSetAuthToken } from "../../utils/api";
const userDataStr = localStorage.getItem("userData");
const userData = JSON.parse(userDataStr);

const authSlice = createSlice({
  name: "auth",
  initialState: userData || {
    isAuthenticated: false,
    user_id: null,
    access_token: null,
    refresh_token: null,
    email: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user_id = action.payload.user_id;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.email = action.payload.email;
      const userData = JSON.stringify({
        isAuthenticated: true,
        user_id: state.user_id,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        email: state.email,
      });
      setAuthToken(state.access_token)
      localStorage.setItem("userData", userData);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user_id = null;
      state.access_token = null;
      state.refresh_token = null;
      state.email = null;
      unSetAuthToken()
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email
export const selectAccessToken = (state) => state.auth.access_token
export const selectRefreshToken = (state) => state.auth.refresh_token