import { useState } from "react";
import Bill from "./Bill";
import Service from "./Service";
import Total from "./Total";
import Reset from "./Reset";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  function handleReset() {
    setBill(0);
    setTip(0);
    setFriendTip(0);
  }

  return (
    <main className="container">
      <Bill bill={bill} setBill={setBill} />
      <Service tip={tip} setTip={setTip}>
        <span>How did you like the service?</span>
      </Service>
      <Service tip={friendTip} setTip={setFriendTip}>
        <span>How did your friend like the service?</span>
      </Service>
      {bill > 0 && (
        <>
          <Total bill={bill} tip={tip} friendTip={friendTip} />
          <Reset onClick={handleReset} />
        </>
      )}
    </main>
  );
}
