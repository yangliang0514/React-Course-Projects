import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({ text, onClick, type }) {
  const navigate = useNavigate();

  switch (type) {
    case "back":
      return (
        <button
          className={`${styles.btn} ${styles.back}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </button>
      );
    default:
      return (
        <button
          className={`${styles.btn} ${styles.primary}`}
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          {text}
        </button>
      );
  }
}
