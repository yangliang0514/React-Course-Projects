import { useState } from "react";
import { tempMovieData, tempWatchedData } from "../public/data";
import NavBar from "./components/Navbar/NavBar";
import Box from "./components/Main/Box";
import Summary from "./components/Main/Summary";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery} />
      <main className="main">
        <Box movies={movies} />
        <Box watched={watched}>
          <Summary watched={watched} />
        </Box>
      </main>
    </>
  );
}
