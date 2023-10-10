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

  return (
    <CityContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
