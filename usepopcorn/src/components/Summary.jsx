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
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
