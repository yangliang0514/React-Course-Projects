import { useEffect, useState } from "react";
import NavBar from "./components/Navbar/NavBar";
import Box from "./components/Main/Box";
import Summary from "./components/Main/Summary";
import MovieList from "./components/Main/MovieList";
import Search from "./components/Navbar/Search";
import ResultNum from "./components/Navbar/ResultNum";
import Main from "./components/Main/Main";
import Loading from "./components/shared/Loading";
import ErrorMessage from "./components/shared/ErrorMessage";
import MovieDetails from "./components/Main/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // set the watch list's initial value to what's stored in the local storage
  // by putting a callback function in the useState hook
  // the function will be called and set the state to whatever is returned
  const [watched, setWatched] = useState(
    () => JSON.parse(localStorage.getItem("watched")) || []
  );

  function handleSelectMovie(id) {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  }

  // store the watched list into local storage
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    handleCloseMovie();
    const controller = new AbortController();
    (async () => {
      try {
        // don't fetch any data if there is no query
        if (query === "") {
          setMovies([]);
          setError(null);
          return;
        }
        // this set state won't be batched because it's in a async function
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&s=${query}`,
          { signal: controller.signal }
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
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search setQuery={setQuery} />
        <ResultNum movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {error ? (
            <ErrorMessage message={error} />
          ) : (
            <>
              {!isLoading && (
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
              )}
            </>
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onSetWatched={setWatched}
              watchedMovies={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <MovieList
                watched={watched}
                onSelectMovie={handleSelectMovie}
                onDeleteMovie={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
