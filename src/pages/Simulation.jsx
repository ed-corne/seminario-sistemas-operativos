import React from "react";
import Card from "../components/Card";
import FormProcess from "../components/FormProcess";
import "../styles/simulation.css";
const Simulation = () => {
  const operations = [
    "Addition",
    "Subtraction",
    "Miltiplication",
    "Division",
    "Remainder",
    "Power",
  ];
  return (
    <div className="simulationPage">
      <div className="simulation__left">
        <Card height={"fit-content"} width={"fit-content"} direction={"column"}>
          <h3>Lotes Pendientes</h3>
          <p>5</p>
        </Card>
        <Card height={"fit-content"} width={"fit-content"} direction={"column"}>
          <h3>Lote en ejecucion</h3>
        </Card>
      </div>
      <div className="simulation__center">
        <h2 className="simulationPage__title">Batch Processing Simulator</h2>
        <Card height={"fit-content"} direction={"column"}>
          <FormProcess />
          <div className="time">
            <Card height={150} width={"40%"} direction={"column"}>
              <h3>Transcurred Time</h3>
              <p>00:00</p>
            </Card>
            <Card height={150} width={"40%"} direction={"column"}>
              <h3>shutdown Time</h3>
              <p>00:00</p>
            </Card>
          </div>
        </Card>
      </div>
      <div className="simulation__right">
        <Card height={"fit-content"} width={"fit-content"}>
          <p>00:00</p>
        </Card>

        <Card height={"fit-content"} width={"fit-content"}>
          <h3>Procesos terminados</h3>
          <p>....</p>
        </Card>
      </div>
    </div>
  );
};

export default Simulation;
