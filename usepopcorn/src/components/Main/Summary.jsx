import MovieInfo from "./MovieInfo";

export default function Summary({ watched }) {
  const avgImdbRating = watched.reduce(
    (acc, curr, _, arr) => acc + curr.imdbRating / arr.length,
    0
  );
  const avgUserRating = watched.reduce(
    (acc, curr, _, arr) => acc + curr.userRating / arr.length,
    0
  );
  const avgRuntime = watched.reduce(
    (acc, curr, _, arr) => acc + curr.runtime / arr.length,
    0
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <MovieInfo
        movie={{
          imdbRating: avgImdbRating,
          userRating: avgUserRating,
          runtime: avgRuntime,
        }}
      >
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
      </MovieInfo>
    </div>
  );
}
