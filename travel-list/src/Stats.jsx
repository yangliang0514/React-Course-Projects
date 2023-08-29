export default function Stats({ items }) {
  // if there is nothing in the items array, early return an message
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list!</em>
      </footer>
    );
  }

  const totalItemCount = items.length;
  const packedItemCount = items.reduce(
    (acc, item) => (item.packed ? acc + 1 : acc),
    0
  );
  const packedPercentage = (packedItemCount / totalItemCount) * 100;

  return (
    <footer className="stats">
      {packedPercentage === 100 ? (
        <em>You've got everything. Ready to go! </em>
      ) : (
        <em>
          You have {totalItemCount} items on your list, and you already packed{" "}
          {packedItemCount} ({packedPercentage.toFixed(2)}%)
        </em>
      )}
    </footer>
  );
}
