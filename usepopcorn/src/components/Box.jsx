import { useState } from "react";
import Movie from "./Movie";

export default function Box({ movies, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && (
        <>
          {children}
          <ul className="list">
            {movies?.map((movie) => (
              <Movie movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
