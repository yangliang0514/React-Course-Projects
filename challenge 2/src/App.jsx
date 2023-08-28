import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <main className="container">
      <div className="control">
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
        <label>Steps: {step}</label>

        {/* <button
          onClick={() => setStep((s) => s && s - 1)}
          className="btn"
        >
          &#8722;
        </button>
        <p>Steps: {step}</p>
        <button onClick={() => setStep((s) => s + 1)} className="btn">
          &#43;
        </button> */}
      </div>
      <div className="control">
        <button onClick={() => setCount((c) => c - step)} className="btn">
          &#8722;
        </button>
        {/* <p>Count: {count}</p> */}
        <input
          type="text"
          value={`Count: ${count}`}
          onChange={(e) => setCount(+e.target.value.split(" ")[1])}
        />
        <button onClick={() => setCount((c) => c + step)} className="btn">
          &#43;
        </button>
      </div>
      <div className="display">
        {count < 0 &&
          `${Math.abs(count)} ${count < -1 ? "days" : "day"} ago was `}
        {count === 0 && "Today is "}
        {count > 0 && `${count} ${count > 1 ? "days" : "day"} from now is `}
        {date.toDateString()}
      </div>

      {/* only render the reset button when the count and step is not in the default state */}
      {(count !== 0 || step !== 1) && (
        <button className="btn-reset" onClick={handleReset}>
          Reset
        </button>
      )}
    </main>
  );
}
