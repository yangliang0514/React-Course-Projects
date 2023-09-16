import { useState } from "react";

export default function ProgressBar({
  currentQuestion,
  totalQuestions,
  points,
  totalPoints,
  selectedAnswer,
}) {
  return (
    <header className="progress">
      <progress
        value={currentQuestion - 1 + (selectedAnswer === null ? 0 : 1)}
        max={totalQuestions}
      />
      <p>
        Question{" "}
        <strong>
          {currentQuestion} / {totalQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {totalPoints}
        </strong>
      </p>
    </header>
  );
}
