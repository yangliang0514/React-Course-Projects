import { useState } from "react";
import { tempMovieData, tempWatchedData } from "../public/data";
import NavBar from "./components/NavBar";
import Box from "./components/Box";
import Summary from "./components/Summary";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar movies={movies} />
      <main className="main">
        <Box movies={movies} />
        <Box movies={watched}>
          <Summary watched={watched} />
        </Box>
      </main>
    </>
  );
}
