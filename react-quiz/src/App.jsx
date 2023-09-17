import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FisishedScreen from "./components/FinishedScreen";
import RestartButton from "./components/RestartButton";
import Timer from "./components/Timer";

const secondsPerQuestion = 20;

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  selectedAnswer: null,
  points: 0,
  highscore: 0,
  seconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        seconds: state.questions.length * secondsPerQuestion,
      };
    case "next":
      return { ...state, index: state.index + 1, selectedAnswer: null };
    case "select":
      const currentQuestion = state.questions[state.index];
      const selectedAnswer = action.payload;
      const points =
        currentQuestion.correctOption === selectedAnswer
          ? state.points + currentQuestion.points
          : state.points;

      return {
        ...state,
        selectedAnswer,
        points,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };
    default:
      throw new Error("Action is unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    selectedAnswer,
    points,
    highscore,
    seconds,
  } = state;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/questions");
        const data = await res.json();

        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    })();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestion={questions.length}
            onStart={() => dispatch({ type: "start" })}
          />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              currentQuestion={index + 1}
              totalQuestions={questions.length}
              points={points}
              totalPoints={totalPoints}
              selectedAnswer={selectedAnswer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              selectedAnswer={selectedAnswer}
            />
            <footer>
              <NextButton
                onNext={() =>
                  dispatch({
                    type: index !== questions.length - 1 ? "next" : "finish",
                  })
                }
                onShow={selectedAnswer}
                isLast={index === questions.length - 1}
              />
              <Timer
                onFinish={() => dispatch({ type: "finish" })}
                seconds={seconds}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FisishedScreen
              points={points}
              totalPoints={totalPoints}
              highscore={highscore}
            />
            <RestartButton onRestart={() => dispatch({ type: "restart" })} />
          </>
        )}
      </main>
    </div>
  );
}
