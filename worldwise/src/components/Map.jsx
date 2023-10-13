import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CityContext";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  // a react router hook to access and set new query strings
  const [position, setPosition] = useState([40, 0]);
  const [geoLocation, getLocation, isLoadingPos] = useGeolocation();
  const { cities } = useCities();

  const [lat, lng] = useUrlPosition();

  // change the current map position if the query strings changes
  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  // set map position to the current location
  useEffect(() => {
    if (geoLocation) setPosition([geoLocation.lat, geoLocation.lng]);
  }, [geoLocation]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={position} zoom={13} className={styles.map}>
        {!geoLocation && (
          <Button
            type="position"
            onClick={getLocation}
            text={isLoadingPos ? "Loading" : "Use your position"}
          />
        )}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ClickShowForm />
        <ChangeCenter position={position} />
      </MapContainer>
    </div>
  );
}

// we need to use components to interact with leaflet
function ChangeCenter({ position }) {
  // this hook is provided by leaflet which returns the current map instance
  // that is currently being display
  const map = useMap();
  map.setView(position);
  // a component must return jsx, but we don't actually need to return anything
  // so return null which is a valid jsx
  return null;
}

function ClickShowForm() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
}
