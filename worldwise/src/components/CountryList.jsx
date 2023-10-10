import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CityContext";

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities.length === 0) {
    return (
      <Message message="Add your first Country by clicking on a Country on the map" />
    );
  }

  const countries = cities.reduce((acc, city) => {
    if (acc.map((el) => el.country).includes(city.country)) return acc;
    return [...acc, { country: city.country, emoji: city.emoji }];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.emoji} />
      ))}
    </ul>
  );
}
