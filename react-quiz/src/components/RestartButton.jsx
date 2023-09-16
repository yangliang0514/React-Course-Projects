export default function RestartButton({ onRestart }) {
  return (
    <button className="btn btn-ui" onClick={onRestart}>
      Restart
    </button>
  );
}
