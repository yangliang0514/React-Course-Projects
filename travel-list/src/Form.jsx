import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Form() {
  const [itemDescript, setItemDescript] = useState("");
  const [itemCount, setItemCount] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (itemCount === "") return;

    const newItem = {
      description: itemDescript,
      quantity: itemCount,
      id: uuidv4(),
      packed: false,
    };

    setItemDescript("");
    setItemCount(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={itemCount} onChange={(e) => setItemCount(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={itemDescript}
        onChange={(e) => setItemDescript(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
