import { useState } from "react";
import MovieList from "./MovieList";

export default function Box({ movies, watched, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && (
        <>
          {children}
          <MovieList movies={movies} watched={watched} />
        </>
      )}
    </div>
  );
}
