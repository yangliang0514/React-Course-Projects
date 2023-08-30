import { useState } from "react";
import { tempMovieData, tempWatchedData } from "../public/data";
import NavBar from "./components/Navbar/NavBar";
import Box from "./components/Main/Box";
import Summary from "./components/Main/Summary";
import MovieList from "./components/Main/MovieList";
import Search from "./components/Navbar/Search";
import ResultNum from "./components/Navbar/ResultNum";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <ResultNum movies={movies} />
      </NavBar>
      <main className="main">
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <Summary watched={watched} />
          <MovieList watched={watched} />
        </Box>
      </main>
    </>
  );
}
