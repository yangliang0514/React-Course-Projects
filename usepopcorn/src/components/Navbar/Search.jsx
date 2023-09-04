import { useEffect, useRef, useState } from "react";
import { useKey } from "../../hooks/useKey";

export default function Search({ setQuery }) {
  const [searchStr, setSearchStr] = useState("");
  // create a ref, usually initialize with null when referencing to a DOM element
  const inputEl = useRef(null);

  function handleSearch(e) {
    if (e.code === "Enter") {
      setQuery(searchStr);
    }
  }

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setSearchStr("");
  });

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
