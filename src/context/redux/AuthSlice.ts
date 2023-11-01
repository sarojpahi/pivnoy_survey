import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserDetails } from "../../config/types";
import { auth } from "../../config/firebase";

const LOCAL_STORAGE_KEY = "authState";
interface AuthState {
  isAuthenticated: boolean;
  user: UserDetails | null;
}
const loadAuthStateFromLocalStorage = () => {
  const serializedAuthState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (serializedAuthState) {
    return JSON.parse(serializedAuthState);
  }
  return null;
};

const saveAuthStateToLocalStorage = (authState: AuthState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authState));
};

const initialState = loadAuthStateFromLocalStorage() || {
  isAuthenticated: false,
  user: null,
};

// Create an async thunk to fetch user data
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const user = auth.currentUser;
  if (user) {
    return { email: user.email || "" } as UserDetails;
  }
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload;
      saveAuthStateToLocalStorage(state);
    },
    logout() {
      saveAuthStateToLocalStorage({ isAuthenticated: false, user: null });
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload;
      saveAuthStateToLocalStorage(state);
    });
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
