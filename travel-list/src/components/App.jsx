import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  function handleToggleItem(id) {
    const newItems = items.map((item) => {
      if (item.id === id) return { ...item, packed: !item.packed };
      return item;
    });
    setItems(newItems);
  }

  function handleClearItems() {
    // early return if there are no items in the list
    if (!items.length) return;
    // a browser api to show a comfirm windows
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    // only clear items when the user confirms it
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <h1>Far Away</h1>
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
