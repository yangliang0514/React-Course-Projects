import { useEffect, useState } from "react";

export function useLocalStorage(initialState, key = "local") {
  // set the watch list's initial state to what's stored in the local storage
  // by putting a callback function in the useState hook
  // the function will be called and set the state to whatever is returned
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );

  // store the state list into local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}
