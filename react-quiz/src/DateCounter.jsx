import { useReducer, useState } from "react";

export default function DateCounter() {
  // const [count, setCount] = useState(0);

  // the useReducer hook takes in 2 arguments,
  // the first is the reducer function and the second is the original state
  // the reduce function also takes in 2 arguments, first is the previous state and second is the action
  // you can custom design what action you want to do with the current state,
  // and the return value will be the new state
  const [count, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "inc":
        return state + action.payload;
      case "dec":
        return state - action.payload;
      case "setCount":
        return action.payload;
    }
  }, 0);

  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  function defineCount(e) {
    // we usually pass an object as an action
    // the convention is to include a type property and a payload property
    dispatch({ type: "setCount", payload: +e.target.value });
  }

  function inc() {
    dispatch({ type: "inc", payload: step });
  }

  function dec() {
    dispatch({ type: "dec", payload: step });
  }

  function defineStep(e) {
    setStep(+e.target.value);
  }

  function reset() {
    setCount(0);
    setStep(1);
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
