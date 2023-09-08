import { useReducer, useState } from "react";

export default function DateCounter() {
  // const [count, setCount] = useState(0);

  const initialState = { count: 0, step: 1 };

  // the useReducer hook takes in 2 arguments,
  // the first is the reducer function (must be a pure function) and the second is the original state
  // the reduce function also takes in 2 arguments, first is the previous state and second is the action
  // you can custom design what action you want to do with the current state,
  // and the return value will be the new state
  // this is a good way to manage multiple states at the same time
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "inc":
        return { ...state, count: state.count + state.step };
      case "dec":
        return { ...state, count: state.count - state.step };
      case "setCount":
        return { ...state, count: action.payload };
      case "setStep":
        return { ...state, step: action.payload };
      case "reset":
        return initialState;
      default:
        throw new Error("Unkown action");
    }
  }, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  function defineCount(e) {
    // we usually pass an object as an action
    // the convention is to include a type property and a payload property
    dispatch({ type: "setCount", payload: +e.target.value });
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: "setStep", payload: +e.target.value })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec", payload: step })}>
          -
        </button>
        <input value={count} onChange={defineCount} />
        <button onClick={() => dispatch({ type: "inc", payload: step })}>
          +
        </button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={(e) => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
