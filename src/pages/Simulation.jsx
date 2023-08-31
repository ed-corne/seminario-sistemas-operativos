import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import FormProcess from "../components/FormProcess";
import "../styles/simulation.css";
import { useLocation } from 'react-router-dom';
import queryString from "query-string"; 

const Simulation = (props) => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const serializedBatches = queryParams.batches;
  const decodedBatches = JSON.parse(decodeURIComponent(serializedBatches));
  const [batchesProps, setBatchesProps] = useState(decodedBatches);
  const [removedElement, setRemovedElement] = useState();
  console.log(batchesProps);

  useEffect(() => {
    popFirstElement(); // Ejecutar popFirstElement al cargar la página
  }, []); // El array de dependencias vacío asegura que se ejecute solo al montar

  const popFirstElement = () => {
    if (batchesProps.length > 0) {
      const firstArray = [...batchesProps[0]];
      setRemovedElement(firstArray[0]) // Elimina el primer objeto del primer arreglo
      firstArray.shift()
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
          <p>{batchesProps.length}</p>
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
          <FormProcess batches={batchesProps} isDisabled={true} processInEje={removedElement}/>
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
