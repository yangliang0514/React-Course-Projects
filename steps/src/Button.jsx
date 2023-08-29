export default function Button({ active, onClick, children }) {
  return (
    <button
      className={active ? "btn-active" : "btn-disabled"}
      onClick={onClick}
    >
      {/* using the children prop */}
      {children}
    </button>
  );
}
