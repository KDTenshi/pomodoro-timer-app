import { FC, useEffect, useState } from "react";
import style from "./Timer.module.css";
import { getTimestring } from "../../../shared/utils/getTimestring";

type TimerStatus = "working" | "resting";

const Timer: FC = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [time, setTime] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("working");

  useEffect(() => {
    if (timerStatus === "working" && time === 5) {
      setTimerStatus("resting");
      setTime(0);
    }

    if (timerStatus === "resting" && time === 5) {
      setTimerStatus("working");
      setTime(0);
    }
  }, [time]);

  useEffect(() => {
    if (isTimerActive) {
      const timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isTimerActive]);

  const stopTimer = () => {
    setIsTimerActive(false);
    setTimerStatus("working");
    setTime(0);
  };

  return (
    <div className={style.Timer}>
      <h1 className={style.Title}>Pomodoro timer</h1>
      <p className={style.Time}>{getTimestring(time)}</p>
      <p className={style.Status}>{timerStatus === "working" ? "Time for work" : "Have a little break"}</p>
      <div className={style.Buttons}>
        {!isTimerActive && (
          <button className={style.Button} onClick={() => setIsTimerActive(true)}>
            <span className="material-symbols-outlined">play_circle</span>
          </button>
        )}
        {isTimerActive && (
          <button className={style.Button} onClick={() => setIsTimerActive(false)}>
            <span className="material-symbols-outlined">pause_circle</span>
          </button>
        )}
        <button className={style.Button} onClick={stopTimer}>
          <span className="material-symbols-outlined">stop_circle</span>
        </button>
      </div>
    </div>
  );
};

export default Timer;
