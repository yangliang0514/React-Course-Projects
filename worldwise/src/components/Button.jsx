import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({ text, onClick, type, to }) {
  const navigate = useNavigate();

  switch (type) {
    case "back":
      return (
        <button
          className={`${styles.btn} ${styles.back}`}
          onClick={(e) => {
            e.preventDefault();
            // navigate to -1 mean to navigate back to the url before
            navigate(to || -1);
          }}
        >
          &larr; Back
        </button>
      );
    case "submit":
      return (
        <button className={`${styles.btn} ${styles[type] || styles.primary}`}>
          {text}
        </button>
      );

    default:
      return (
        <button
          className={`${styles.btn} ${styles[type] || styles.primary}`}
          onClick={onClick}
        >
          {text}
        </button>
      );
  }
}
