import Movieinfo from "./MovieInfo";

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
      {watched && <Movieinfo movie={item} />}
    </li>
  );
}
