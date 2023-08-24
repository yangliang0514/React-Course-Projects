export default function Pizza({ pizza }) {
  return (
    <>
      <h3>{pizza.name}</h3>
      <img src={pizza.photoName} />
      <p>{pizza.ingredients}</p>
      <p>{pizza.price}</p>
    </>
  );
}
