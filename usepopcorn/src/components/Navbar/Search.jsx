import { useState } from "react";

export default function Search({ setQuery }) {
  const [searchStr, setSearchStr] = useState("");

  function handleSearch(e) {
    if (e.key === "Enter") {
      setQuery(searchStr);
    }
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={searchStr}
      onChange={(e) => setSearchStr(e.target.value)}
      onKeyDown={(e) => handleSearch(e)}
    />
  );
}
