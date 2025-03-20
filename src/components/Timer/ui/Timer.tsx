import { FC, useEffect, useState } from "react";
import style from "./Timer.module.css";
import { getTimestring } from "../../../shared/utils/getTimestring";

type TimerStatus = "working" | "resting";

const Timer: FC = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const [time, setTime] = useState(0);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("working");
  const audio = new Audio("/public/sound.wav");

  useEffect(() => {
    if (timerStatus === "working" && time === workTime * 60) {
      setTimerStatus("resting");
      audio.play();
      setTime(0);
    }

    if (timerStatus === "resting" && time === restTime * 60) {
      setTimerStatus("working");
      audio.play();
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
      <input type="text" value={workTime} onChange={(e) => setWorkTime(parseInt(e.target.value))} />
      <input type="text" value={restTime} onChange={(e) => setRestTime(parseInt(e.target.value))} />
      <button className={[style.Button, style.Setting].join(" ")}>
        <span className="material-symbols-outlined">settings</span>
      </button>
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
