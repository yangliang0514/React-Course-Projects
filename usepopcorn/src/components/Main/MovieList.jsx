import Movie from "./Movie";

export default function MovieList({
  movies,
  watched,
  onSelectMovie,
  onDeleteMovie,
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onClick={onSelectMovie} />
      ))}
      {watched?.map((movie) => (
        <Movie
          watched={movie}
          key={movie.imdbID}
          onClick={onSelectMovie}
          onDelete={onDeleteMovie}
        />
      ))}
    </ul>
  );
}
