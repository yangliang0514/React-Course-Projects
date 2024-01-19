import { createSlice } from "@reduxjs/toolkit";

// interface item {
//   pizzaId: number;
//   name: string;
//   quantity: number;
//   unitPrice: number;
//   totalPrice: number;
// }

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload == newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload == pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload == pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      // because an item is an object, directly mutating it here also changes the items in the cart
      // not sure if it is a good way to write it like this though
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload == pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      // remove item if quantity == 0
      if (item.quantity === 0) {
        // this gets access to the reducer of the slice itself
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export function getTotalQuantity(state) {
  return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getTotalPrice(state) {
  return state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
}

export function getItemQuantity(id) {
  return (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity || 0;
}
