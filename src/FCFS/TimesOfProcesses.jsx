import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import Card from "../components/Card";
import "../styles/times.css";
import ProcessInfo from "./ProcessInfo";

const TimesOfProcesses = ({
  data,
  readyList,
  newList,
  current,
  lockedList,
}) => {
  const [completedProcess, setCompletedProcess] = useState(data);
  const location = useLocation();
  useEffect(() => {
    if (!data) {
      console.log("No data");
      const queryParams = queryString.parse(location.search);
      const serializedCompletedProcess = queryParams.data;
      const decodedCompletedProcess = JSON.parse(
        decodeURIComponent(serializedCompletedProcess)
      );
      setCompletedProcess(decodedCompletedProcess);
      console.log(decodedCompletedProcess);
    }
  }, []); // El array vacío [] como segundo argumento asegura que el efecto se ejecute solo una vez

  return (
    <Card
      width={"fit-content"}
      height={"fit-Content"}
      color={"#f8e7b9"}
      direction={"row"}
    >
      <div>
        <h3>Procesos en nuevos</h3>
        {newList &&
          newList.map((process) => (
            <ProcessInfo process={process}></ProcessInfo>
          ))}
      </div>
      <div>
        <h3>Procesos en listos</h3>
        {readyList &&
          readyList.map((process) => (
            <ProcessInfo process={process}></ProcessInfo>
          ))}
      </div>
      <div>
        <h3>Proceso actual</h3>
        <ProcessInfo process={current}></ProcessInfo>
      </div>
      <div>
        <h3>Procesos en bloqueados</h3>
        {lockedList &&
          lockedList.map((process) => (
            <ProcessInfo process={process}></ProcessInfo>
          ))}
      </div>
      <div>
        <h3 className="title">Procesos Terminados</h3>
        {completedProcess &&
          completedProcess.map((process) => (
            <ProcessInfo process={process}></ProcessInfo>
          ))}
      </div>
    </Card>
  );
};

export default TimesOfProcesses;
