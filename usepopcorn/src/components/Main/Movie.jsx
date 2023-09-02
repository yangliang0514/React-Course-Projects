import Movieinfo from "./MovieInfo";

export default function Movie({ movie, watched, onClick, onDelete }) {
  const item = movie || watched;

  return (
    <li onClick={() => onClick(item.imdbID)}>
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
        <>
          <Movieinfo movie={item} />
          <button
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.imdbID);
            }}
          >
            X
          </button>
        </>
      )}
    </li>
  );
}
