export default function Total({ tip, friendTip, bill }) {
  const totalTip = Math.round(bill * ((tip + friendTip) / 2));
  const total = bill + totalTip;

  return (
    <h1 className="total">
      The total is ${total} (${bill} + ${totalTip} tip)
    </h1>
  );
}
