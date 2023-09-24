import React, { useEffect, useState } from "react";

const FormProcess = (props) => {
  const { batches, setBatches, isDisabled, processInEje } = props;

  const [operation, setOperation] = useState("Addition");
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [processNumber, setProcessNumber] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [idProgram, setIdProgram] = useState(0);

  useEffect(() => {
    if (processInEje !== undefined && isDisabled) {
      setOperation(processInEje.operation);
      setNumber1(processInEje.number1);
      setNumber2(processInEje.number2);
      setMaxTime(processInEje.maxTime);
      setIdProgram(processInEje.idProgram);
    }
  }, [processInEje, isDisabled]);


  const handleCapture = () => {
    setBatches((prevBatches) => {
      let newProcessBatch = [];

      for (let i = 0; i < processNumber; i++) {
        const newProcess = {
          operation: operations[randomNumber(0, operations.length)],
          number1: randomNumber(0, 10000),
          number2: randomNumber(0, 10000),
          maxTime: randomNumber(6, 19),
          idProgram: i + 1,
          error: false,
        };

        if (newProcessBatch.length === 3) {
          prevBatches.push(newProcessBatch);
          newProcessBatch = [];
        }

        newProcessBatch.push(newProcess);
      }

      if (newProcessBatch.length > 0) {
        prevBatches.push(newProcessBatch);
      }

      return [...prevBatches];
    });
  };

  const operations = [
    "Addition",
    "Subtraction",
    "Multiplication",
    "Division",
    "Remainder"
  ];

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <>
      {isDisabled ? (
        <>
          <label className="card__label">Program number</label>
          <input
            type="number"
            placeholder="1"
            className="card__input"
            value={idProgram}
            disabled
            onChange={(e) => setIdProgram(e.target.value)}
          />

          <label className="card__label">Operation</label>
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
          <label className="card__label">Maximum estimated time</label>
          <input
            type="number"
            placeholder="3"
            className="card__input"
            value={maxTime}
            disabled={isDisabled}
            onChange={(e) => setMaxTime(e.target.value)}
          />
        </>
      ) : (
        <>
          <h2 className="card__title">Number of process</h2>
          <label className="card__label">Select the process to execute</label>
          <input
            type="number"
            placeholder="0"
            className="card__input"
            value={processNumber}
            disabled={isDisabled}
            onChange={(e) => setProcessNumber(e.target.value)}
          />
          <button onClick={handleCapture}>Check</button>
        </>
      )}
    </>
  );
};

export default FormProcess;
