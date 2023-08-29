import { useState } from "react";
import Button from "./Button";
import StepMessage from "./StepMessage";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step <= 1) return;
    setStep((prev) => prev - 1);
  }

  function handleNext() {
    if (step >= 3) return;
    setStep((prev) => prev + 1);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "Hide" : "Show"}
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>
            <p>{messages[step - 1]}</p>
          </StepMessage>

          <div className="buttons">
            {/* elements can also be passed in as children prop */}
            {/* just by putting them inside the component */}
            <Button onClick={handlePrevious} active={step > 1}>
              <span>👈🏻</span> Previous
            </Button>
            <Button onClick={handleNext} active={step < 3}>
              Next <span>👉🏻</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
