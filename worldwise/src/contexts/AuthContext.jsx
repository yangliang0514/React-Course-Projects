/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useReducer } from "react";

// this is a fake auth provider for learning purpose
const AuthContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isLoggedIn: true };
    case "logout":
      return { ...state, user: null, isLoggedIn: false };
    default:
      throw new Error("Unknown aciton");
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isLoggedIn } = state;

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      return dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext was used outside of AuthProvider");
  }

  return context;
}
