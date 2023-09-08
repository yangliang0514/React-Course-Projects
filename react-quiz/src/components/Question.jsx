import Options from "./Options";

export default function Question({ question, dispatch, selectedAnswer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        dispatch={dispatch}
        selectedAnswer={selectedAnswer}
        correctOption={question.correctOption}
      />
    </div>
  );
}
