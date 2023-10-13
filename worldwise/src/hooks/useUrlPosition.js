import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // getting data from the searchParams
  const [searchParams] = useSearchParams();
  const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];

  return [lat, lng];
}
