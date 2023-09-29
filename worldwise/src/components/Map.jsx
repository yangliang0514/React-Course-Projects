import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  // a react router hook to access and set new query strings
  const [searchParams, setSearchParams] = useSearchParams();

  // a react router hook that returns a function that accepts a route
  // then navigate to that route
  const navigate = useNavigate();

  // getting data from the searchParams
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position {lat}, {lng}
      </h1>
    </div>
  );
}
