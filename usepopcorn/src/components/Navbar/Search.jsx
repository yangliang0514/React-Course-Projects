import { useEffect, useRef, useState } from "react";

export default function Search({ setQuery }) {
  const [searchStr, setSearchStr] = useState("");
  // create a ref, usually initialize with null when referencing to a DOM element
  const inputEl = useRef(null);

  function handleSearch(e) {
    if (e.code === "Enter") {
      setQuery(searchStr);
    }
  }

  // focus on the search input element and clears it when pressing enter
  useEffect(() => {
    const autoFocus = (e) => {
      // don't focus if it is already focused
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        // the inputEl.current is the DOM element that is connected
        inputEl.current.focus();
        setSearchStr("");
      }
    };
    // add the autoFocus listener to the document element
    document.addEventListener("keydown", autoFocus);

    return () => {
      document.removeEventListener("keydown", autoFocus);
    };
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchStr}
      onChange={(e) => setSearchStr(e.target.value)}
      onKeyDown={(e) => handleSearch(e)}
      // connect the ref to this dom element
      ref={inputEl}
    />
  );
}
