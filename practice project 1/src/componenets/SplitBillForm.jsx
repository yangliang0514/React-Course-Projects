import { useEffect, useState } from "react";
import Button from "./Button";

export default function SplitBillForm({ friend, onUpdateBalance }) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [paying, setPaying] = useState("user");
  const friendExpense = bill ? bill - expense : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !expense) return;
    const newBalance = paying === "user" ? bill - expense : -expense;
    const newFriend = { ...friend, balance: friend.balance + newBalance };
    onUpdateBalance(newFriend);
  }

  useEffect(() => {
    setBill("");
    setExpense("");
    setPaying("user");
  }, [friend]);

  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>Split a bill with {friend.name}</h2>
      <label>Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(+e.target.value <= 0 ? "" : +e.target.value)}
      />
      <label>Your expense</label>
      <input
        type="number"
        value={expense}
        onChange={(e) =>
          setExpense(
            +e.target.value < bill
              ? +e.target.value <= 0
                ? ""
                : +e.target.value
              : expense
          )
        }
      />
      <label>{friend.name}'s expense</label>
      <input type="number" disabled value={friendExpense} />
      <label>Who is paying the bill</label>
      <select value={paying} onChange={(e) => setPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
