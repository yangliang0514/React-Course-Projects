export default function MovieInfo({ movie, children }) {
  return (
    <div>
      {children}
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.Runtime} min</span>
      </p>
    </div>
  );
}
