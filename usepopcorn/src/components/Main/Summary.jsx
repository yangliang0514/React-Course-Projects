import MovieInfo from "./MovieInfo";

export default function Summary({ watched }) {
  const avgImdbRating =
    Math.round(
      watched.reduce(
        (acc, curr, _, arr) => acc + curr.imdbRating / arr.length,
        0
      ) * 10
    ) / 10;
  const avgUserRating =
    Math.round(
      watched.reduce(
        (acc, curr, _, arr) => acc + curr.userRating / arr.length,
        0
      ) * 10
    ) / 10;
  const avgRuntime =
    Math.round(
      watched.reduce(
        (acc, curr, _, arr) => acc + curr.Runtime / arr.length,
        0
      ) * 10
    ) / 10;

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <MovieInfo
        movie={{
          imdbRating: avgImdbRating,
          userRating: avgUserRating,
          Runtime: avgRuntime,
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
