import Pizza from "./Pizza";
import pizzaData from "../public/data";

export default function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.map((pizza) => (
        <Pizza pizza={pizza} key={pizza.id} />
      ))}
    </main>
  );
}
