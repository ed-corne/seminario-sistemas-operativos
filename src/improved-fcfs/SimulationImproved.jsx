import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import "../styles/simulation.css";
import Left from "./Left";
import Center from "./Center";
import Right from "./Right";
import { handleKeyPress } from "../components/Utils";
import TimesOfProcesses from "../FCFS/TimesOfProcesses";

const SimulationImproved = () => {
  // get the batches from the props
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const serializedBatches = queryParams.batches;
  const decodedBatches = JSON.parse(decodeURIComponent(serializedBatches));
  // lists of processes of diferent states
  const [newProcess, setNewProcess] = useState(decodedBatches.slice(3));
  const [readyProcess, setReadyProcess] = useState(decodedBatches.slice(1, 3));
  const [currentProcess, setCurrentProcess] = useState(decodedBatches[0]);
  const [completedProcess, setCompletedProcess] = useState([]);
  const [lockedProcess, setLockedProcess] = useState([]);

  const [paused, setPaused] = useState(false);

  // times of the current process, seconds and seconds restantes
  const [seconds, setSeconds] = useState(0);
  const [secondsR, setSecondsR] = useState(
    currentProcess ? currentProcess.maxTime : 0
  );
  // For the global time
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);

  // a flag to know if the ejection is completed
  const [allBatchesProcessed, setAllBatchesProcessed] = useState(false);

  let esperando = false;

  const [isOpen, setIsOpen] = useState(false);

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
      if (currentProcess && seconds === currentProcess.maxTime) {
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

  const errorProcess = () => {
    setReadyProcess((prev) => prev.slice(1));
    setNewProcess((prev) => prev.slice(1));
    currentProcess.error = true;
    currentProcess.completionTime = minutos * 60 + segundos;
    currentProcess.returnTime =
      currentProcess.returnTime + segundos + minutos * 60;
    setCompletedProcess((prevCompleted) => [...prevCompleted, currentProcess]);

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
  };

  const interrupProcess = () => {
    if (lockedProcess.length < 3) {
      console.log("Interrup", lockedProcess);
      // move Process to locked list
      currentProcess.maxTime = secondsR;
      setLockedProcess((prev) => [...prev, currentProcess]);
      console.log("Interrup", lockedProcess);
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
        if (readyProcess.length === 0 || newProcess.length === 0) {
          console.log("entro lendgt");
          setCurrentProcess(lockedProcess[0]);
          setSeconds(0);
          setSecondsR(lockedProcess[0].maxTime);
          setReadyProcess((prev) => prev.slice(1));
        }
      });

      console.log("El programa principal continúa ejecutándose");
    }
  };
  // for interrupted process
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

  const addProcess = () => {
    // Simplemente agrega un nuevo proceso de ejemplo a la cola
    const newProcess_ = {
      operation: ["suma", "resta", "multiplicacion", "division"][
        Math.floor(Math.random() * 4)
      ],
      number1: randomNumber(0, 10000),
      number2: randomNumber(0, 10000),
      maxTime: randomNumber(6, 19),
      idProgram: newProcess[newProcess.length - 1]
        ? newProcess[newProcess.length - 1].idProgram + 1
        : randomNumber(10, 99),
      error: false,
      arrivalTime: 0,
      completionTime: 0,
      returnTime: 0,
      responseTime: 0,
      waitTime: 0,
      serviceTime: 0,
    };
    const memory = readyProcess.length + lockedProcess.length + 1;
    if (
      !newProcess[0] &&
      lockedProcess.length < 2 &&
      readyProcess.length < 2 &&
      memory < 3
    ) {
      setReadyProcess((prev) => [...prev, newProcess_]);
    } else {
      setNewProcess((prev) => [...prev, newProcess_]);
    }
  };

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const showTable = () => {
    setPaused(!paused);
    setIsOpen(!isOpen);
  };

  //listener for keyboard
  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(
        event,
        currentProcess,
        interrupProcess,
        errorProcess,
        addProcess,
        setPaused,
        showTable
      );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentProcess,
    interrupProcess,
    errorProcess,
    addProcess,
    setPaused,
    showTable,
  ]);

  return (
    <>
      <div className="simulationPage">
        <Left newProcess={newProcess} readyProcess={readyProcess}></Left>

        <Center
          currentProcess={currentProcess}
          seconds={seconds}
          secondsR={secondsR}
          lockedProcess={lockedProcess}
          allBatchesProcessed={allBatchesProcessed}
          paused={paused}
          completedProcess={completedProcess}
        ></Center>

        <Right
          allBatchesProcessed={allBatchesProcessed}
          segundos={segundos}
          setSegundos={setSegundos}
          minutos={minutos}
          setMinutos={setMinutos}
          paused={paused}
          completedProcess={completedProcess}
        ></Right>
      </div>
      <div>
        {isOpen && (
          <div className="modal">
            <TimesOfProcesses data={completedProcess}></TimesOfProcesses>
          </div>
        )}
      </div>
    </>
  );
};

export default SimulationImproved;
