import React from "react";
import Card from "../components/Card";

const ProcessInfo = ({ process }) => {
  const symbols = {
    Addition: "+",
    Subtraction: "-",
    Multiplication: "*",
    Division: "/",
    Remainder: "%",
    Power: "^",
  };

  const formatTime = (time) => {
    const minuto = Math.trunc(time / 60);
    const segundo = time % 60;
    return (
      String(minuto).padStart(2, "0") + " : " + String(segundo).padStart(2, "0")
    );
  };

  return (
    <Card
      key={process.id}
      width={"fit-content"}
      height={"fit-Content"}
      color={"#b2b2b2"}
      direction={"column"}
    >
      <div className="card">
        <p className="text --textId">ID Proceso {process.idProgram}</p>
        <p className="text">
          <b>Operacion: </b>
          {process.number1} {symbols[process.operation]} {process.number2}
        </p>
        <p className="text">
          <b>TME: </b>
          {process.maxTime}
        </p>
        <p className="text">
          <b>T. Llegada: </b>
          {formatTime(process.arrivalTime)}
        </p>
        <p className="text">
          <b>T. Finalizacion: </b>
          {formatTime(process.completionTime)}
        </p>
        <p className="text">
          <b>T. Retorno: </b>
          {formatTime(process.returnTime)}
        </p>
        <p className="text">
          <b>T. Respuesta: </b>
          {formatTime(process.responseTime)}
        </p>
        <p className="text">
          <b>T. Espera </b>
          {formatTime(process.waitTime)}
        </p>
        <p className="text">
          <b>T. Servisio </b>
          {formatTime(process.serviceTime)}
        </p>
      </div>
    </Card>
  );
};

export default ProcessInfo;
