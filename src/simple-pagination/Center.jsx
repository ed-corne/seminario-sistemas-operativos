import React from "react";
import Card from "../components/Card";
import "../styles/simulation.css";
import FormProcess from "../components/GenerateProcess";
import { nextPageWithData } from "../components/Utils";

const Center = ({ currentProcess, seconds, secondsR, lockedProcess, allBatchesProcessed, paused, completedProcess }) => {
  return (
    <div>
      {/* Centro de la pantalla */}
      <div className="simulation__center">
        {/* Processo actual */}
        <Card
          height={"fit-content"}
          width={"800px"}
          direction={"row"}
          color={"#e56c70"}
        >
          {paused ? <h3 className="paused">Pausado</h3> : <></>}
          <h2 className="--mainProcess">Proceso en Ejecución</h2>
          <FormProcess
            isDisabled={true}
            processInEje={currentProcess}
            allBatchesProcessed={allBatchesProcessed}
          />

          <div className="time">
            {/* Mostrar el tiempo restante del proceso y el tiempo transcurrido del proceso */}
            <Card
              height={"fit-content"}
              width={"fit-content"}
              color={"#ff6bb5"}
            >
              <h3>Tiempo Transcurrido: </h3>
              <h3>{seconds}</h3>
            </Card>
            <Card
              height={"fit-content"}
              width={"fit-content"}
              color={"#ff6bb5"}
            >
              <h3>Tiempo Restante: </h3>
              <h3>{secondsR}</h3>
            </Card>
          </div>
        </Card>
        <Card
          height={"fit-content"}
          width={"93%"}
          direction={"row"}
          color={"#dd3142"}
        >
          <h2>Procesos en Bloqueados</h2>
          {lockedProcess.map((process, index) => (
            <Card
              height={"fit-content"}
              width={"fit-content"}
              color={"#f8e7b9"}
              direction={"column"}
              key={index}
            >
              <p>ID: {process.idProgram}</p>
              <p>TME: {process.maxTime}</p>
            </Card>
          ))}
        </Card>
        {allBatchesProcessed ? (
          <Card height={"fit-content"} width={"93%"} color={"#6be1ff"}>
            <h3>Se han ejecutado todos los Procesos</h3>
            <button
              onClick={() => nextPageWithData(completedProcess, "times")}
              className="card__button --large"
            >
              Ver Tiempos de los procesos
            </button>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default Center;
