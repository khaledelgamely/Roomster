import { configureStore } from "@reduxjs/toolkit";
import userData from "./Slices/userSlice";
import apartments from "./Slices/apartment";
import currencySlice from './Slices/currency';
import usersSlice from "./Slices/AllUsersSlice";

const store = configureStore({
  reducer: {
    user: userData,
    apartments: apartments,
    currency: currencySlice,
    users: usersSlice,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export default store;
