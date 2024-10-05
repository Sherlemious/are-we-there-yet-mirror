import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./modules/Register/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
