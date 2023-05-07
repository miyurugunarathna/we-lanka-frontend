import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User";

const store = configureStore({
  reducer: { user: userReducer },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
