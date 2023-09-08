import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import FormProcess from "../components/FormProcess";
import "../styles/simulation.css";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import Timer from "../components/Timer";
import Calculator from "../components/Calculator";

const Simulation = (props) => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const serializedBatches = queryParams.batches;
  const decodedBatches = JSON.parse(decodeURIComponent(serializedBatches));
  const [batchesProps, setBatchesProps] = useState(decodedBatches);
  const [removedElement, setRemovedElement] = useState();
  const [shouldRender, setShouldRender] = useState(false);
  const [completeProcess, setCompleteProcess] = useState([]);
  const [isLast, setIsLast] = useState(false);

  //
  const [interrupted, setInterrupted] = useState(false);
  let actualElement = null;
  let actualBatch = [];
  let isPaused = false;
  let isError = false;

  ////

  useEffect(() => {
    //console.log(batchesProps);
    const handleKeyPress = (event) => {
      // Verifica si la tecla presionada es la que deseas usar para interrumpir
      if (!interrupted) {
        //console.log("testt init")
        //console.log(decodedBatches)
        //console.log(actualElement)
        if (event.key === "i" || event.key === "I") {
          console.log("Tecla 'I' presionada");
          // Pasa el proceso actual a la cola
          if(actualElement){
            //console.log("decodedBatches");
            //console.log(decodedBatches);
          const newActualBatch = [...actualBatch.slice(1), actualElement];
          //console.log("new actual batch: ");
          //console.log(newActualBatch);
          actualBatch = newActualBatch;
          //console.log("Actual batch: ");
          //console.log(actualBatch);
          //console.log("uodate decodedBatches");
          decodedBatches[0] = actualBatch;
          //console.log(decodedBatches);
          //actualElement = null;
        }
         
          
        } else if (event.key === "e" || event.key === "E") {
          console.log("Tecla 'E' presionada");
          // Termina el proceso actual y marca con error
          isError = true;
          setInterrupted(true);
        } else if (event.key === "p" || event.key === "P") {
          console.log("Tecla 'P' presionada");
          // Detiene la ejecución del proceso actual
          // Puedes agregar aquí la lógica para detener el proceso
          isPaused = true;
          setInterrupted(true);
        } else if (event.key === "c" || event.key === "C") {
          console.log("Tecla 'C' presionada");
          // Continúa con la ejecución del programa (solo si se pausó previamente)
          // Puedes agregar aquí la lógica para continuar el programa
          if (isPaused && actualElement) {
            isPaused = false;
          }
          setInterrupted(false);
        }
      }
    };

    // Agrega el evento al documento durante toda la ejecución del componente
    document.addEventListener("keydown", handleKeyPress);

    // No se necesita una función de retorno para quitar el evento
  }, [interrupted]);

  ///////

  useEffect(() => {
    if (batchesProps.length > 0 && batchesProps[0].length > 0) {
      actualElement = batchesProps[0][0];
      actualBatch = batchesProps[0];
      //console.log(actualElement)
      const maxTime = batchesProps[0][0].maxTime * 1000;

      setRemovedElement(batchesProps[0][0]);
      //console.log(removedElement);
      setIsLast(batchesProps[0].length === 1); // Step 1
      const timeoutId = setTimeout(() => {
        popFirstElement();
        setShouldRender(true);
        setRemovedElement();
        setIsLast(false); // Reset isLast after processing
      }, maxTime);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [batchesProps]);

  const popFirstElement = () => {
    if (batchesProps.length > 0) {
      const firstArray = [...batchesProps[0]];
      setCompleteProcess((prevData) => [...prevData, firstArray[0]]);
      setRemovedElement(firstArray[0]); // Elimina el primer objeto del primer arreglo
      firstArray.shift();
      setIsLast(firstArray.length === 1); // Check if the new firstArray is the last element

      if (firstArray.length === 0) {
        const newArray = [...batchesProps];
        newArray.shift(); // Elimina el primer arreglo si está vacío
        setBatchesProps(newArray); // Actualiza el estado con el arreglo actualizado
      } else {
        const newArray = [...batchesProps];
        newArray[0] = firstArray; // Actualiza el primer arreglo en el arreglo de arreglos
        setBatchesProps(newArray); // Actualiza el estado con el arreglo actualizado
      }
    }
  };

  return (
    <div className="simulationPage">
      <div className="simulation__left">
        <Card height={"fit-content"} width={"fit-content"} direction={"column"}>
          <h3>Lotes Pendientes</h3>
          <p>{batchesProps.length - 1}</p>
        </Card>
        <Card height={"fit-content"} width={"fit-content"} direction={"column"}>
          <h3>Lote en ejecucion</h3>
          {batchesProps.length > 0 && batchesProps[0].length > 0 ? (
            batchesProps[0].map((batch, index) => (
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
      <div className="simulation__center">
        <h2 className="simulationPage__title">Batch Processing Simulator</h2>
        <Card height={"fit-content"} direction={"column"}>
          <FormProcess
            batches={batchesProps}
            isDisabled={true}
            processInEje={removedElement}
          />
          <div className="time">
            <Timer
              title={"Transcurred Time"}
              time={
                removedElement !== undefined ? removedElement.maxTime : null
              }
              isRegressive={false}
              isLast={isLast}
              isGlobal={false}
            />
            <Timer
              title={"shut down Time"}
              time={
                removedElement !== undefined ? removedElement.maxTime : null
              }
              isRegressive={true}
              isLast={isLast}
              isGlobal={false}
            />
          </div>
        </Card>
      </div>
      <div className="simulation__right">
        <Timer
          title={"Global Time"}
          time={removedElement !== undefined ? removedElement.maxTime : null}
          isRegressive={false}
          isLast={isLast}
          is
          isGlobal={true}
        />

        <Card height={"fit-content"} width={"fit-content"} direction={"column"}>
          <h3>Procesos terminados</h3>
          {completeProcess.length > 0 && shouldRender ? (
            completeProcess.map((process, index) => (
              <Calculator key={index} process={process} />
            ))
          ) : (
            <p>No hay procesos terminados</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Simulation;
