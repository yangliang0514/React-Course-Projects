import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountsSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";

// combines all reducers together into one
const rootReducer = combineReducers({
  // this key maps to the state name in the store
  account: accountReducer,
  customer: customerReducer,
});

// creates one central store to manage all states in one place
// the store is a object that looks like { account: ..., customer: ... } in this case
// also set the "thunk" as middleware that is being executed between getting the data and storing into the store
const store = createStore(rootReducer, applyMiddleware(thunk)); // this is a deprecated to create a store

// using the action creators with dispatch to modify the states like this
// store.dispatch(createCustomer("Kevin Yang", "12390534"));
// store.dispatch(deposit(5000));

export default store;
