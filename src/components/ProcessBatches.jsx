import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import Card from "../components/Card";
import FormProcess from "../components/FormProcess";
import "../styles/simulation.css";
import GlobalTime from "./GlobalTime";
import ShowResult from "./ShowResult";
import Calculator from "./Calculator.jsx";
import Timer from "./Timer";

function App() {
  // get the batches from the props
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const serializedBatches = queryParams.batches;
  const decodedBatches = JSON.parse(decodeURIComponent(serializedBatches));
  const [currentProcess, setCurrentProcess] = useState(decodedBatches[0]);
  const [processQueue, setProcessQueue] = useState(decodedBatches.slice(1));
  const [paused, setPaused] = useState(false);
  const [completedProcess, setCompletedProcess] = useState([]);
  const currentPage = 0;
  const itemsPerPage = 3;

  //timer
  const [seconds, setSeconds] = useState(0);
  const [secondsR, setSecondsR] = useState(currentProcess ? currentProcess.maxTime : 0);

const [allBatchesProcessed, setAllBatchesProcessed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        //console.log('if seconds : ', seconds, '< maxtime: ', currentProcess.maxTime)
      if (currentProcess && seconds < currentProcess.maxTime) {
        //console.log(seconds);
        //console.log(currentProcess);
        setSeconds((prevSeconds) => prevSeconds + 1);
        setSecondsR((prevSeconds) => prevSeconds - 1);
        
      } else {
        //console.log('else seconds', seconds);
        setSeconds(0);
        clearInterval(interval);
        setSecondsR(currentProcess ? currentProcess.maxTime : 0);
      }
    }
    }, 1000);

    if(processQueue.length === 0 && currentProcess === null){
      setAllBatchesProcessed(true);
    }
    return () => {
      clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [seconds, currentProcess, processQueue, paused]);

  // process queue
  useEffect(() => {
    //const processInterval = setInterval(
      //() => {
        if (!paused) {
          //console.log('entro !paused');
          if(currentProcess && seconds === currentProcess.maxTime){
            //console.log("entro seconds")
          if (currentProcess) {
            // Procesar el proceso actual
            console.log(`Proceso ${currentProcess.idProgram}: `);

            setCompletedProcess((prevCompleted) => [
              ...prevCompleted,
              currentProcess,
            ]);
            // Eliminar el proceso actual de la cola
            setProcessQueue((prevQueue) => prevQueue.slice(1));
            setCurrentProcess(null);
            setSeconds(0);
            setSecondsR(processQueue[0] ? processQueue[0].maxTime : 0)
          }

          const nextProcess = processQueue[0];
          // Obtener el siguiente proceso de la cola
          if (nextProcess) {
            setCurrentProcess(nextProcess);
          } else {
            //clearInterval(processInterval);
            console.log("La cola de procesos está vacía.");
          }
        }
        }
      //},
      currentProcess ? currentProcess.maxTime * 1000 : 3000
    //);

    //return () => clearInterval(processInterval);
  }, [processQueue, currentProcess, paused, seconds]);

  // function for detecting the keyboard
  const handleKeyPress = (event) => {
    if (currentProcess) {
      switch (event.key) {
        case "I":
        case "i":
          // Pasar el proceso actual a la cola
          currentProcess.maxTime = secondsR;
          console.log(secondsR)
          setProcessQueue((prevQueue) => [
            ...prevQueue.slice(1),
            currentProcess,
          ]);
          setCurrentProcess(processQueue[0]);
          setSeconds(0);
          setSecondsR(processQueue[0] ? processQueue[0].maxTime : 0)
          break;
        case "E":
        case "e":
          // Marcar el proceso actual como error y eliminarlo de la cola
          console.log(
            `Proceso ${currentProcess.idProgram} marcado como error.`
          );
          setProcessQueue((prevQueue) => prevQueue.slice(1));
          currentProcess.error = true;
          setCompletedProcess((prevCompleted) => [
            ...prevCompleted,
            currentProcess,
          ]);
          setCurrentProcess(processQueue[0]);
          setSeconds(0);
          setSecondsR(processQueue[0] ? processQueue[0].maxTime : 0)
          if(processQueue.length === 0){
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
      id: processQueue.length + 1,
      number1: Math.random() * 10,
      number2: Math.random() * 10,
      operation: ["suma", "resta", "multiplicacion", "division"][
        Math.floor(Math.random() * 4)
      ],
    };
    setProcessQueue((prevQueue) => [...prevQueue, newProcess]);
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
          >
            <h3>Lotes Pendientes</h3>
            <p>{parseInt(processQueue.length / 3)}</p>
          </Card>
          {/* Elementos restantes del Lote en ejecucion */}
          <Card
            height={"fit-content"}
            width={"fit-content"}
            direction={"column"}
          >
            <h3>Lote en ejecucion</h3>
            {processQueue.length > 0 ? (
              processQueue
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((batch, index) => (
                  <Card
                    height={"fit-content"}
                    width={"fit-conte"}
                    direction={"column"}
                    key={index}
                  >
                    <p>Program Number: {batch.idProgram}</p>
                    <p>Max Time: {batch.maxTime}</p>
                  </Card>
                ))
            ) : (
              <p>No hay lotes en ejecución</p>
            )}
          </Card>
        </div>

        {/* Centro de la pantalla */}
        <div className="simulation__center">
          <Card height={"fit-content"}>
            <h2 className="simulationPage__title">
              Batch Processing Simulator
            </h2>
            <p>Estado del Programa: {paused ? "Pausado" : "Ejecutando"}</p>
            <p>Presiona las teclas I, E, P o C para interactuar.</p>
          </Card>
          {/* Processo actual */}
          <Card height={"fit-content"} direction={"column"}>
            <FormProcess isDisabled={true} processInEje={currentProcess} />

            <div className="time">
              {/* Mostrar el tiempo restante del proceso y el tiempo transcurrido del proceso */}
              <Card height={"fit-content"}>
                <p>{seconds}</p>
              </Card>
              <Card height={"fit-content"}>
                <p>{secondsR}</p>
              </Card>
            </div>
          </Card>
        </div>

        {/* Derecha de la pantalla */}
        <div className="simulation__right">
          {/* Contador Global */}
          <Card>
            <GlobalTime allBatchesProcessed={allBatchesProcessed}/>
          </Card>
          {/* Procesos Terminados */}
          <Card
            height={"fit-content"}
            width={"fit-content"}
            direction={"column"}
          >
            <h3>Procesos terminados</h3>
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
}

export default App;
