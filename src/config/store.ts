import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../context/redux/AuthSlice";
import FormSlice from "../context/redux/FormSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    form: FormSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
