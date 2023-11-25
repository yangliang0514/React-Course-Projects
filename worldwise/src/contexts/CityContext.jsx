/* eslint-disable react-refresh/only-export-components */

import { useCallback } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";

const CityContext = createContext();
const URL = "http://localhost:8000";

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    // better to set these types as event rather than setters
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "loading":
      return { ...state, isLoading: true };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknow action type.");
  }
}

export default function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, currentCity, isLoading } = state;

  useEffect(() => {
    (async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error while loading data...",
        });
      }
    })();
  }, []);

  // use the useCallback hook to memoize this function through re-render,
  // to prevent infinite loop when putting this as a useEffect dependency
  const getCity = useCallback(
    async function (id) {
      if (+id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities/${id}`);
        const city = await res.json();
        dispatch({ type: "city/loaded", payload: city });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error while loading data...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(city) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newCity = await res.json();

      dispatch({ type: "city/created", payload: newCity });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating data...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/cities/${id}`, { method: "DELETE" });

      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
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

export function useCities() {
  const context = useContext(CityContext);

  if (context === undefined) {
    throw new Error("CititesContext was used outside of the CitiesProvider.");
  }

  return context;
}
