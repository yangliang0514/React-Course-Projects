export default function Footer() {
  const currentHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  return <footer>{isOpen ? "We're currently open!" : "We're closed!"}</footer>;
}
