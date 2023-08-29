export default function Service({ children, tip, setTip }) {
  return (
    <div className="bill">
      <label>{children}</label>
      <select value={tip} onChange={(e) => setTip(+e.target.value)}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="0.05">It was okay (5%)</option>
        <option value="0.1">It was good (10%)</option>
        <option value="0.2">Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}
