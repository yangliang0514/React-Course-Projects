import { useEffect } from "react";

export function useKey(key, callback) {
  // attaching an event listener directly to the dom is a side effect
  // which should be put in the useEffect hook
  // and it is allowed in React to manipulate the dom directly in the useEffect hook
  useEffect(() => {
    // to remove an eventListener, the passed in function has to be the exact same one,
    // so we have to define it separately
    const action = (e) => {
      if (e.code === key) callback();
    };

    document.addEventListener("keydown", action);

    // remove the eventListener when the component unmounts
    // or else it'll attach a new eventListener each time a component mounts (creating duplicates)
    return () => {
      document.removeEventListener("keydown", action);
    };
  }, [key, callback]);
}
