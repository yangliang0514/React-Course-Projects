export default function NextButton({ onNext, onShow, isLast }) {
  return (
    <>
      {onShow !== null && (
        <button className="btn btn-ui" onClick={onNext}>
          {isLast ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
}
