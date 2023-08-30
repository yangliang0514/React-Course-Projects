import Movie from "./Movie";

export default function MovieList({ movies, watched }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
      {watched?.map((movie) => (
        <Movie watched={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
