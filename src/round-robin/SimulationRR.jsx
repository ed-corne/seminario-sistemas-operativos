import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import Card from "../components/Card";
import FormProcess from "../components/GenerateProcess";
import "../styles/simulation.css";
import GlobalTime from "../components/GlobalTime";
import Calculator from "../components/Calculator.jsx";

const SimulationRR = () => {
  // get the batches from the props
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const serializedBatches = queryParams.batches;
  const decodedBatches = JSON.parse(decodeURIComponent(serializedBatches));

  const [newProcess, setNewProcess] = useState(decodedBatches.slice(3));
  const [readyProcess, setReadyProcess] = useState(decodedBatches.slice(1, 3));
  const [currentProcess, setCurrentProcess] = useState(decodedBatches[0]);

  const [paused, setPaused] = useState(false);
  const [completedProcess, setCompletedProcess] = useState([]);
  const currentPage = 0;
  const itemsPerPage = 3;

  //bloeueados
  const [lockedProcess, setLockedProcess] = useState([]);
  const [memory, setMemory] = useState(3);
  const [freeMemory, setFreeMemory] = useState(0);

  //timer
  const [seconds, setSeconds] = useState(0);
  const [secondsR, setSecondsR] = useState(
    currentProcess ? currentProcess.maxTime : 0
  );

  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);

  let esperando = false;

  const [allBatchesProcessed, setAllBatchesProcessed] = useState(false);

  const handleSimulationClick = () => {
    const serializedBatches = encodeURIComponent(
      JSON.stringify(completedProcess)
    );
    const queryParams = queryString.stringify({
      completedProcess: serializedBatches,
    });
    window.location.href = `/times?${queryParams}`;
  };

  useEffect(() => {
    if (currentProcess && seconds === 0) {
      // calculate the response time from any process
      currentProcess.responseTime = minutos * 60 + segundos;
      currentProcess.waitTime =
        minutos * 60 + segundos - currentProcess.waitTime;
    }
    const interval = setInterval(() => {
      if (!paused) {
        currentProcess.serviceTime = currentProcess.serviceTime + 1;
        if (currentProcess && seconds < currentProcess.maxTime) {
          setSeconds((prevSeconds) => prevSeconds + 1);
          setSecondsR((prevSeconds) => prevSeconds - 1);
          // Pasar el proceso actual a la cola
          currentProcess.maxTime = secondsR - 1;
          if (readyProcess[0]) {
            setReadyProcess((prev) => [...prev.slice(1), currentProcess]);
            setCurrentProcess(readyProcess[0]);
            setSeconds(0);
            setSecondsR(readyProcess[0] ? readyProcess[0].maxTime : 0);
          }
        } else {
          setSeconds(0);
          clearInterval(interval);
          setSecondsR(currentProcess ? currentProcess.maxTime : 0);
        }
      }
    }, 1000);

    if (
      newProcess.length === 0 &&
      readyProcess.length === 0 &&
      lockedProcess.length === 0 &&
      !currentProcess
    ) {
      setAllBatchesProcessed(true);
    }
    return () => {
      clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [seconds, currentProcess, readyProcess, paused, lockedProcess]);

  // process queue
  useEffect(() => {
    if (!paused) {
      if (currentProcess && currentProcess.maxTime === 0) {
        if (currentProcess) {
          // Procesar el proceso actual
          console.log(`Proceso ${currentProcess.idProgram}: `);
          currentProcess.completionTime = minutos * 60 + segundos;
          currentProcess.returnTime =
            currentProcess.returnTime + segundos + minutos * 60;
          setCompletedProcess((prevCompleted) => [
            ...prevCompleted,
            currentProcess,
          ]);
          // Eliminar el proceso actual de la cola
          setReadyProcess((prev) => prev.slice(1));
          setNewProcess((prev) => prev.slice(1));
          setCurrentProcess(null);
          setSeconds(0);
          setSecondsR(readyProcess[0] ? readyProcess[0].maxTime : 0);
          setMemory(memory - 1);
        }
        if (newProcess[0] && lockedProcess.length < 2) {
          newProcess[0].waitTime = minutos * 60 + segundos;
          setReadyProcess((prev) => [...prev, newProcess[0]]);
        }
        setCurrentProcess(readyProcess[0] ? readyProcess[0] : newProcess[0]);
      }
    }

    currentProcess ? currentProcess.maxTime * 1000 : 3000;
  }, [
    readyProcess,
    currentProcess,
    paused,
    seconds,
    newProcess,
    lockedProcess,
  ]);

  //////
  async function esperar10Segundos() {
    // Utiliza una promesa para esperar 10 segundos
    await new Promise((resolve) => {
      setTimeout(() => {
        esperando = false; // Después de esperar, restablecer la bandera
        resolve();
      }, 10000); // 10000 milisegundos = 10 segundos
    });

    // Después de esperar, puedes realizar cualquier tarea que necesites aquí
    console.log("Han pasado 10 segundos");
  }

  // function for detecting the keyboard
  const handleKeyPress = (event) => {
    if (currentProcess) {
      switch (event.key) {
        case "I":
        case "i":
          if (lockedProcess.length < 3) {
            // move Process to locked list
            currentProcess.maxTime = secondsR;
            setLockedProcess((prev) => [...prev, currentProcess]);

            setReadyProcess((prev) => prev.slice(1));

            setSeconds(0);
            setSecondsR(readyProcess[0] ? readyProcess[0].maxTime : 0);

            //nuevo a listos
            const cont = readyProcess.length + lockedProcess.length + 1;
            if (newProcess[0] && cont < 3) {
              newProcess[0].waitTime = minutos * 60 + segundos;
              setReadyProcess((prev) => [...prev, newProcess[0]]);
            }
            setCurrentProcess(readyProcess[0]);
            //esperar 10s para pasar a listos
            // Llama a la función asíncrona en segundo plano

            esperar10Segundos().then(() => {
              console.log("La función esperar10Segundos ha terminado");
              console.log("locked", lockedProcess[0]);
              currentProcess.returnTime = currentProcess.returnTime + 10;
              newProcess[0].waitTime = minutos * 60 + segundos;
              setReadyProcess((prev) => [...prev, currentProcess]);
              setLockedProcess((prev) => prev.slice(1));
              console.log("Locked", readyProcess);
              console.log("new", newProcess);
              if (readyProcess.length === 0 || newProcess.length - 1 === 0) {
                console.log("entro lendgt");
                setCurrentProcess(lockedProcess[0]);
                setSeconds(0);
                setSecondsR(lockedProcess[0].maxTime);
                setReadyProcess((prev) => prev.slice(1));
              }
            });

            console.log("El programa principal continúa ejecutándose");
          }
          break;
        case "E":
        case "e":
          setReadyProcess((prev) => prev.slice(1));
          setNewProcess((prev) => prev.slice(1));
          currentProcess.error = true;
          currentProcess.completionTime = minutos * 60 + segundos;
          currentProcess.returnTime =
            currentProcess.returnTime + segundos + minutos * 60;
          setCompletedProcess((prevCompleted) => [
            ...prevCompleted,
            currentProcess,
          ]);

          if (newProcess[0] && lockedProcess.length < 2) {
            newProcess[0].waitTime = minutos * 60 + segundos;
            setReadyProcess((prev) => [...prev, newProcess[0]]);
          }
          setCurrentProcess(readyProcess[0] ? readyProcess[0] : newProcess[0]);
          setSeconds(0);
          setSecondsR(readyProcess[0] ? readyProcess[0].maxTime : 0);
          if (
            newProcess.length === 1 &&
            readyProcess.length === 0 &&
            lockedProcess.length === 0 &&
            !currentProcess
          ) {
            setAllBatchesProcessed(true);
          }

          break;
        case "P":
        case "p":
          // Detener la ejecución del proceso actual
          setPaused(true);
          break;
        case "C":
        case "c":
          // Continuar la ejecución del programa si se pausó previamente
          setPaused(false);
          break;
        default:
          break;
      }
    }
  };

  //listener for keyboard
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentProcess, secondsR]);

  const addProcess = () => {
    // Simplemente agrega un nuevo proceso de ejemplo a la cola
    const newProcess = {
      id: readyProcess.length + 1,
      number1: Math.random() * 10,
      number2: Math.random() * 10,
      operation: ["suma", "resta", "multiplicacion", "division"][
        Math.floor(Math.random() * 4)
      ],
    };
    setReadyProcess((prev) => [...prev, newProcess]);
  };

  return (
    <>
      <div className="simulationPage">
        {/* Lada izquierdo de la pantalla */}
        <div className="simulation__left">
          {/* contador de lotes pendientes */}
          <Card
            height={"fit-content"}
            width={"fit-content"}
            direction={"column"}
            color={"#ff6bb5"}
          >
            <h3>Procesos en Nuevos RR</h3>
            <h3>{Math.round(newProcess.length)}</h3>
          </Card>
          {/* Elementos restantes del Lote en ejecucion */}
          <Card
            height={"fit-content"}
            width={"fit-content"}
            direction={"column"}
            color={"#00bfff"}
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

        {/* Centro de la pantalla */}
        <div className="simulation__center">
          {/* Processo actual */}
          <Card
            height={"fit-content"}
            width={"800px"}
            direction={"row"}
            color={"#7dfa00"}
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
                color={"#ffc105"}
              >
                <h3>Tiempo Transcurrido: </h3>
                <h3>{seconds}</h3>
              </Card>
              <Card
                height={"fit-content"}
                width={"fit-content"}
                color={"#ffc105"}
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
            color={"#ff6b6b"}
          >
            <h2>Procesos en Bloqueados</h2>
            {lockedProcess.map((process, index) => (
              <Card
                height={"fit-content"}
                width={"fit-content"}
                color={"#ffc105"}
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
                onClick={handleSimulationClick}
                className="card__button --large"
              >
                Ver Tiempos de los procesos
              </button>
            </Card>
          ) : null}
        </div>

        {/* Derecha de la pantalla */}
        <div className="simulation__right">
          {/* Contador Global */}
          <Card height={"fit-content"} width={"fit-content"} color={"#ff8c00"}>
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
            color={"#6c00fa"}
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
    </>
  );
};

export default SimulationRR;
