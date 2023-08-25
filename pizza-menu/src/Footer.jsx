import Close from "./Close";
import Open from "./open";

export default function Footer() {
  const currentHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Open closeHour={closeHour} />
      ) : (
        <Close openHour={openHour} closeHour={closeHour} />
      )}
    </footer>
  );
}
