import Item from "./Item";

export default function PackingList({ items, onDeleteItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItems} />
        ))}
      </ul>
    </div>
  );
}
