import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  // not a good practice to pass setState directly as a prop (?)
  const handleAddItems = (newItem) => setItems((items) => [...items, newItem]);

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}
