import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import notesReducer from "./slices/notesSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type AppDispatch = typeof store.dispatch;
