import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import CitiesProvider from "../contexts/CityContext";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <CitiesProvider>
      <div className={styles.app}>
        <Sidebar />
        <Map />
      </div>
    </CitiesProvider>
  );
}
