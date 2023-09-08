import React, { useState, useEffect } from "react";
import Card from "./Card";

const Timer = ({ title, time, isRegressive, isLast, isGlobal }) => {
  const [seconds, setSeconds] = useState(isRegressive ? time : 1);
  const [cont, setCont] = useState(0);
  
  useEffect(() => {
    if (isRegressive && time !== null) {
      setSeconds(time);
    }
  }, [isRegressive, time]);
  
  useEffect(() => {
    let interval;
    if(isGlobal && cont <=time && isLast) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setCont(cont + 1);
    }else if (isGlobal && !isLast && cont < time) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (isRegressive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => Math.max(prevSeconds - 1, 0));
      }, 1000);
    } else if (isRegressive && seconds === 0) {
      // Aquí reiniciamos el contador a 0 una vez que termine el tiempo regresivo
      setSeconds(0);
    } else if (seconds < time) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }else if (seconds == time) {
        setSeconds(1);
    } 
    return () => {
      clearInterval(interval);
    };
  }, [seconds, time, isRegressive]);
  

  // Función para formatear los segundos en "MM:SS"
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card width={"fit-content"} height={"fit-content"} direction={"column"}>
      <h3>{title}</h3>
      <p>
        {formatTime(seconds)}
      </p>
    </Card>
  );
};

export default Timer;
