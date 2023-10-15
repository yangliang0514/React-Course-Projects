import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();
const URL = "http://localhost:8000";

export default function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setisLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert(err);
      } finally {
        setisLoading(false);
      }
    })();
  }, []);

  async function getCity(id) {
    try {
      setisLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const city = await res.json();
      setCurrentCity(city);
    } catch (err) {
      alert(err);
    } finally {
      setisLoading(false);
    }
  }

  async function createCity(city) {
    try {
      setisLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newCity = await res.json();

      setCities((cities) => [...cities, newCity]);
    } catch (err) {
      alert(err);
    } finally {
      setisLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setisLoading(true);
      await fetch(`${URL}/cities/${id}`, { method: "DELETE" });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert(err);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);

  if (context === undefined) {
    throw new Error("CititesContext was used outside of the CitiesProvider.");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useCities };
