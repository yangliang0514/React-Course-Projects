import Button from "./Button";

export default function Friend({ friend, onSelect, isSelected }) {
  function handleSelect() {
    if (isSelected) return onSelect(null);
    onSelect(friend);
  }

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}.
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}.
        </p>
      )}
      <Button onClick={handleSelect}>{isSelected ? "close" : "Select"}</Button>
    </li>
  );
}
