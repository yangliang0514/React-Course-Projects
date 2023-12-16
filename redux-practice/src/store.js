import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountsSlice";
import customerReducer from "./features/customers/customerSlice";

// this is the newer way to create a store,
// it sutomatically creates the combined reducer and sets
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
