import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from "./Form.module.css";
import Button from "./Button";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CityContext";

const geoApiUrl = (lat, lng) =>
  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;

    (async () => {
      try {
        setIsLoadingGeo(true);
        const res = await fetch(geoApiUrl(lat, lng));
        const data = await res.json();

        if (!data.city) {
          throw new Error(
            "This doesn't seem to be a city. Click somewhere else."
          );
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrMessage(err.message);
      } finally {
        setIsLoadingGeo(false);
      }
    })();

    return () => {
      setErrMessage("");
    };
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeo) return <Spinner />;
  if (!lat || !lng) return <Message message="Start by clicking on the map." />;
  if (errMessage) return <Message message={errMessage} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"MM/dd/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="submit" text="Add" />
        <Button type="back" to="/app/cities" />
      </div>
    </form>
  );
}

export default Form;
