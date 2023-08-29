export default function Item({ item }) {
  return (
    <li>
      <span className={item.packed ? "packed" : ""}>
        {item.quantity} {item.description}
      </span>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="30px"
          height="30px"
        >
          <path
            fill="#bae0bd"
            d="M7.5 0.5A7 7 0 1 0 7.5 14.5A7 7 0 1 0 7.5 0.5Z"
          />
          <path
            fill="#5e9c76"
            d="M7.5,1C11.1,1,14,3.9,14,7.5S11.1,14,7.5,14S1,11.1,1,7.5S3.9,1,7.5,1 M7.5,0C3.4,0,0,3.4,0,7.5 S3.4,15,7.5,15S15,11.6,15,7.5S11.6,0,7.5,0L7.5,0z"
          />
          <path
            fill="#5e9c76"
            d="M6.3 10.5L3.7 7.9 4.4 7.2 6.3 9.1 11.2 4.3 11.9 5z"
          />
        </svg>
      </button>
    </li>
  );
}
