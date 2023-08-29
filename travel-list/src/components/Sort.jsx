export default function Sort({ sortBy, setSortBy, onClearItems }) {
  return (
    <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button className="btn" onClick={onClearItems}>
        Clear List
      </button>
    </div>
  );
}
