export default function Movie({ movie, watched }) {
  const item = movie || watched;

  return (
    <li>
      <img src={item.Poster} alt={`${item.Title} poster`} />
      <h3>{item.Title}</h3>
      {movie && (
        <div>
          <p>
            <span>🗓</span>
            <span>{item.Year}</span>
          </p>
        </div>
      )}
      {watched && (
        <div>
          <p>
            <span>⭐️</span>
            <span>{item.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{item.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{item.runtime} min</span>
          </p>
        </div>
      )}
    </li>
  );
}
