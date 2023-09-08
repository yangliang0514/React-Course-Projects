export default function NextButton({ onNext, onShow }) {
  return (
    <>
      {onShow !== null && (
        <button className="btn btn-ui" onClick={onNext}>
          Next
        </button>
      )}
    </>
  );
}
