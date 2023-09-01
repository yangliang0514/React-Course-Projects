import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "../public/data";
import NavBar from "./components/Navbar/NavBar";
import Box from "./components/Main/Box";
import Summary from "./components/Main/Summary";
import MovieList from "./components/Main/MovieList";
import Search from "./components/Navbar/Search";
import ResultNum from "./components/Navbar/ResultNum";
import Main from "./components/Main/Main";
import Loading from "./components/shared/Loading";
import ErrorMessage from "./components/shared/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // this set state won't be batched because it's in a async function
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${
            query || "batman"
          }`
        );

        if (!res.ok) {
          throw new Error("Something went wrong...");
        }
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <ResultNum movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} />
          )}
        </Box>
        <Box>
          <Summary watched={watched} />
          <MovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
