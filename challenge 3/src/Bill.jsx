export default function Bill({ bill, setBill }) {
  return (
    <div className="bill">
      <label htmlFor="bill">How much was the bill?</label>
      <input
        id="bill"
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />
    </div>
  );
}
