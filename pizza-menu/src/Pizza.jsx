export default function Pizza({ pizza }) {
  return (
    <div className="pizza">
      <h3>{pizza.name}</h3>
      <img src={pizza.photoName} alt="pizza" />
      <div>
        <p>{pizza.ingredients}</p>
        <span>$ {pizza.price}</span>
      </div>
    </div>
  );
}
