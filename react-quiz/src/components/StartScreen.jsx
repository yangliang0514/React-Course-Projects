export default function StartScreen({ numQuestion, onStart }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestion} questions to test your React skills</h3>
      <button onClick={onStart} className="btn btn-ui">
        Let's start
      </button>
    </div>
  );
}
