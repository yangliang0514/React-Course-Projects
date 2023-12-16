// a slice file is just one part of the store (redux central state)

// initial state of an account
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// reducer functions that exports to a central store file to manage state
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

// redux action creators (functions that return actions instead of manually writing them by hand),
// a common practice of using redux
// these action creators exports to be used in file that modifies these states
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // because we've set the thunk middleware, when returning a function (basically putting a function inside a dispatch)
  // redux will know that it needs to be executed to get the state value
  // the function has access to the redux dispatch and getState function (second argument)
  return async (dispatch) => {
    // set a loading state
    dispatch({ type: "account/convertingCurrency" });

    // api call to convert currency
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();

    // dispatch the end result
    dispatch({ type: "account/deposit", payload: data.rates.USD });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
