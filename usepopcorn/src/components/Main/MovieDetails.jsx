import { useEffect, useState } from "react";
import StarRating from "../shared/StarRating";
import Loading from "../shared/Loading";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onSetWatched,
  watchedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: +movie.imdbRating,
      Runtime: movie.Runtime.split(" ")[0],
      userRating,
    };

    onSetWatched((watchedMovies) => [...watchedMovies, newWatchedMovie]);
    onCloseMovie();
  }

  function handleUpdateRating() {
    onSetWatched((watched) =>
      watched.map((movie) => {
        if (movie.imdbID === selectedId) {
          return { ...movie, userRating };
        }
        return movie;
      })
    );
    onCloseMovie();
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched && (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                    defaultRating={watchedUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleUpdateRating}>
                      Update User Rating
                    </button>
                  )}
                </>
              )}
              {!isWatched && (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to Watched List
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed By {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
