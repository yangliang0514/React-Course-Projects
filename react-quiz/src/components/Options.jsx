export default function Options({
  options,
  dispatch,
  selectedAnswer,
  correctOption,
}) {
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="options">
      {options.map((option, i) => (
        <button
          className={`btn btn-option ${selectedAnswer == i ? "answer" : ""} ${
            hasAnswered ? (i === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "select", payload: i })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
