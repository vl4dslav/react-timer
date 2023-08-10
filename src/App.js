import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);
  const [timer, setTimer] = useState(0);
  const timerID = useRef(0);

  let startDate = null;
  let currDate = null;

  const makeAnimationStep = () => {
    if (startDate === null) {
      startDate = Date.now();
      timerID.current = requestAnimationFrame(() => {
        makeAnimationStep();
      });
    } else {
      currDate = Date.now();
      if (Math.abs(currDate - startDate - 1000) < 10) {
        setTimer((prev) => {
          startDate = null;
          cancelAnimationFrame(timerID.current);
          return prev - 1 > 0 ? prev - 1 : 0;
        });
      } else {
        timerID.current = requestAnimationFrame(() => {
          makeAnimationStep();
        });
      }
    }
  };

  useEffect(() => {
    makeAnimationStep();
  }, [timer]);

  const handleChange = (e) => {
    const nums = e.target.value
      .split("")
      .filter((char) => +char < 9)
      .join("");
    setValue(+nums);
  };

  const handleClick = () => {
    cancelAnimationFrame(timerID.current);
    setTimer(value);
    setValue(0);
  };

  const showTimer = () => {
    const hours = Math.floor(timer / 3600);
    const mins = Math.floor((timer - hours * 3600) / 60);
    const secs = timer - hours * 3600 - mins * 60;
    const hh = hours < 10 ? "0" + hours : hours;
    const mm = mins < 10 ? "0" + mins : mins;
    const ss = secs < 10 ? "0" + secs : secs;
    return hh + ":" + mm + ":" + ss;
  };

  return (
    <div className="App">
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleClick}>start</button>
      <div>{showTimer()}</div>
    </div>
  );
}

export default App;
