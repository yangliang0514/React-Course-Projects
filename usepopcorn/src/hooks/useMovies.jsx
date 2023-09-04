import { useEffect, useState } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    callback?.();
    const controller = new AbortController();
    (async () => {
      try {
        // don't fetch any data if there is no query
        if (query === "") {
          setMovies([]);
          setError(null);
          return;
        }
        // this set state won't be batched because it's in a async function
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_API_KEY
          }&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong...");
        }
        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
