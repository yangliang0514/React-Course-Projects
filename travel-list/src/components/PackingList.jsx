import Item from "./Item";
import Sort from "./Sort";
import { useState } from "react";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  switch (sortBy) {
    case "input":
      sortedItems = items;
      break;
    case "description":
      sortedItems = [...items].sort((a, b) =>
        a.description.localeCompare(b.description)
      );
      break;
    case "packed":
      sortedItems = [...items].sort(
        // Number(true) == 1, Number(false) == 0
        (a, b) => Number(a.packed) - Number(b.packed)
      );
      break;
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <Sort sortBy={sortBy} setSortBy={setSortBy} onClearItems={onClearItems} />
    </div>
  );
}
