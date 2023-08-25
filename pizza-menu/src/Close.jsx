export default function Close({ openHour, closeHour }) {
  return (
    <p>
      Sorry we're closed. The store will be open between {openHour}:00 and{" "}
      {closeHour}:00
    </p>
  );
}
