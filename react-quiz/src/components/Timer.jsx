import { useEffect, useState } from "react";

export default function Timer({ seconds, onFinish }) {
  const [time, setTime] = useState(seconds);

  const min = Math.floor(time / 60);
  const sec = time % 60;

  useEffect(() => {
    if (time <= 0) onFinish();
    const id = setInterval(() => setTime((time) => time - 1), 1000);

    return () => clearInterval(id);
  }, [time]);

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min} : {sec < 10 && "0"}
      {sec}
    </div>
  );
}
