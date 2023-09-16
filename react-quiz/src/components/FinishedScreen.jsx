export default function FisishedScreen({ points, totalPoints, highscore }) {
  const percentage = Math.round((points / totalPoints) * 10000) / 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} ({percentage}{" "}
        % )
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}
