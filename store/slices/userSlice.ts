// store/authSlice.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkFirstTimeUser = createAsyncThunk(
  "auth/checkFirstTimeUser",
  async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem("isFirstTime");

      if (isFirstTime === null) {
        await AsyncStorage.setItem("isFirstTime", "there is auser");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking first time user:", error);
      throw error;
    }
  }
);

export interface UserState {
  isFirstTime: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isFirstTime: true,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkFirstTimeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkFirstTimeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFirstTime = action.payload;
        state.error = null;
      })
      .addCase(checkFirstTimeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        state.isFirstTime = true;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
