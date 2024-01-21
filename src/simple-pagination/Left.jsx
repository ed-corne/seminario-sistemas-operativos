import React from "react";
import Card from "../components/Card";
import "../styles/simulation.css";

const Left = ({ newProcess, readyProcess }) => {
  return (
    <div>
      {/* Lada izquierdo de la pantalla */}
      <div className="simulation__left">
        {/* contador de lotes pendientes */}
        <Card
          height={"fit-content"}
          width={"fit-content"}
          direction={"column"}
          color={"#f5b9a3"}
        >
          <h3>Procesos en Nuevos</h3>
          <h3>{Math.round(newProcess.length)}</h3>
        </Card>
        {/* Elementos restantes del Lote en ejecucion */}
        <Card
          height={"fit-content"}
          width={"fit-content"}
          direction={"column"}
          color={"#f09ea8"}
        >
          <h3>Procesos en Listos</h3>
          {readyProcess.length > 0 ? (
            readyProcess.map((batch, index) => (
              <Card
                height={"fit-content"}
                width={"fit-conte"}
                direction={"column"}
                color={"#b2b2b2"}
                key={index}
              >
                <p>ID: {batch.idProgram}</p>
                <p>TME: {batch.maxTime}</p>
              </Card>
            ))
          ) : (
            <p>No hay procesos en Listos</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Left;
