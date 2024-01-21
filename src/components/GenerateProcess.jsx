import React, { useEffect, useState } from "react";

const GenerateProcess = (props) => {
  const { batches, setBatches, isDisabled, processInEje, allBatchesProcessed } = props;

  const [operation, setOperation] = useState("Addition");
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [processNumber, setProcessNumber] = useState(34);
  const [maxTime, setMaxTime] = useState(0);
  const [idProgram, setIdProgram] = useState(0);

  useEffect(() => {
    if (processInEje !== undefined && isDisabled && processInEje) {
      setOperation(processInEje.operation);
      setNumber1(processInEje.number1);
      setNumber2(processInEje.number2);
      setMaxTime(processInEje.maxTime);
      setIdProgram(processInEje.idProgram);
    }else if (allBatchesProcessed){
      setOperation("");
      setNumber1("");
      setNumber2("");
      setMaxTime("");
      setIdProgram("");
    }
  }, [processInEje, isDisabled]);

  const handleCapture = () => {
    // Simplemente agrega un nuevo proceso de ejemplo a la cola
    for (let i = 0; i < processNumber; i++) {
      const newProcess = {
        operation: operations[randomNumber(0, operations.length)],
        number1: randomNumber(0, 10000),
        number2: randomNumber(0, 10000),
        maxTime: randomNumber(1, 5),
        idProgram: i + 1,
        error: false,
        arrivalTime: 0,
        completionTime: 0,
        returnTime: 0,
        responseTime: 0,
        waitTime: 0,
        serviceTime: 0,
      };
      setBatches((prevQueue) => [...prevQueue, newProcess]);
    }
  };
  const operations = [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
    "Remainder",
  ];

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <>
      {isDisabled ? (
        <>
          <label className="card__label">Numero del Programa (ID)</label>
          <input
            type="number"
            placeholder="1"
            className="card__input"
            value={idProgram}
            disabled
            onChange={(e) => setIdProgram(e.target.value)}
          />

          <label className="card__label">Operación</label>
          <input
            type="number"
            placeholder="num 1"
            className="card__input"
            value={number1}
            disabled={isDisabled}
            onChange={(e) => setNumber1(e.target.value)}
          />
          <select
            className="card__select"
            value={operation}
            disabled={isDisabled}
            onChange={(e) => setOperation(e.target.value)}
          >
            {operations.map((operation, index) => (
              <option key={index} className="select__option">
                {operation}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="num 2"
            className="card__input"
            value={number2}
            disabled={isDisabled}
            onChange={(e) => setNumber2(e.target.value)}
          />
          <label className="card__label">Quantum</label>
          <input
            type="number"
            placeholder="1 segundo"
            className="card__input"
            value={"1 segundo"}
            disabled={isDisabled}
            onChange={(e) => setMaxTime(e.target.value)}
          />
        </>
      ) : (
        <>
          <h2 className="card__title">Numero de Trabajos Inicial</h2>
          
          <input
            type="number"
            placeholder="0"
            className="card__input"
            value={processNumber}
            disabled={true  }
            onChange={(e) => setProcessNumber(e.target.value)}
            
          />
          <button onClick={handleCapture}>Generar Trabajos</button>
        </>
      )}
    </>
  );
};

export default GenerateProcess;
