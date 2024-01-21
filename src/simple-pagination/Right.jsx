import React from "react";
import Card from "../components/Card";
import "../styles/simulation.css";
import GlobalTime from "../components/GlobalTime";
import Calculator from "../components/Calculator";

const Right = ({ allBatchesProcessed, segundos, setSegundos, minutos, setMinutos, paused, completedProcess }) => {
  return (
    <div>
      {/* Derecha de la pantalla */}
      <div className="simulation__right">
        {/* Contador Global */}
        <Card height={"fit-content"} width={"fit-content"} color={"#f5b9a3"}>
          <GlobalTime
            allBatchesProcessed={allBatchesProcessed}
            segundos={segundos}
            setSegundos={setSegundos}
            minutos={minutos}
            setMinutos={setMinutos}
            paused={paused}
          />
        </Card>
        {/* Procesos Terminados */}
        <Card
          height={"fit-content"}
          width={"fit-content"}
          direction={"column"}
          color={"#f09ea8"}
        >
          <h3>Procesos Terminados</h3>
          {completedProcess.length > 0 ? (
            completedProcess.map((process, index) => (
              <Calculator process={process} key={index} />
            ))
          ) : (
            <p>No hay procesos terminados</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Right;
