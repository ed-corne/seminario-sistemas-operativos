import React from "react";
import Card from "../components/Card";
import "../styles/card.css";
import { Link } from "react-router-dom";
import FormProcess from "../components/FormProcess";

const Process = () => {
  console.log("Inicio");
  var interval = setInterval(function () {
    console.log("Pausa cada 2 segundos");
  }, 2000); // 2000 milisegundos = 2 segundos

  // Para detener el intervalo después de cierto tiempo
  setTimeout(function () {
    clearInterval(interval);
    console.log("Fin");
  }, 10000); // Detiene después de 10 segundos

  const estructura = [
    [
      {
        nombre: "",
        operacion: "",
        num1: 0,
        num2: 0,
      },
      {},
    ],
    [{}],
  ];



  return (
    <>
    <Card width={"fit-content"} height={"fit-content"} direction={"column"}>
      <h3>Process Added</h3>
      <p>0</p>
    </Card>
      <Card height={"fit-content"}>
        <FormProcess/>
        <button className="card__button">Capture</button>
        <Link to={"/simulation"} className="card__button --large">
          Simulate
        </Link>
      </Card>
    </>
  );
};

export default Process;
