import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApiUrl } from "../../config/apiUrls";

export interface User {
  userId: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  token: localStorage.getItem("jwtToken") || null,
  user: null,
  status: "idle",
};

// Async thunk pour récupérer le profil utilisateur avec le token
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${getApiUrl()}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // On peut retourner une erreur formatée
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      // On suppose que la réponse est de la forme { message: "...", user: { ... } }
      return data.user as User;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("jwtToken", action.payload);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("jwtToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
