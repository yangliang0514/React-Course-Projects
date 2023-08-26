import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <main className="container">
      <div className="control">
        <button
          onClick={() => setStep((prev) => prev && prev - 1)}
          className="btn"
        >
          &#8722;
        </button>
        <p>Steps: {step}</p>
        <button onClick={() => setStep((prev) => prev + 1)} className="btn">
          &#43;
        </button>
      </div>
      <div className="control">
        <button onClick={() => setCount((prev) => prev - step)} className="btn">
          &#8722;
        </button>
        <p>Count: {count}</p>
        <button onClick={() => setCount((prev) => prev + step)} className="btn">
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
    </main>
  );
}
