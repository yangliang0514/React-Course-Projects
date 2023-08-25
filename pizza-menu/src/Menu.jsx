import Pizza from "./Pizza";
import pizzaData from "../public/data";

export default function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {pizzaData.length !== 0 && (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza pizza={pizza} key={pizza.id} />
          ))}
        </ul>
      )}
    </main>
  );
}
