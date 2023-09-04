import { useState } from "react";
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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // a custom hook that fetches all the movies and returns results
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  // a custom hook to store the watched movies state into local storage
  const [watched, setWatched] = useLocalStorage([], "watched");

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
