import React, { useEffect, useState } from "react";

const FormProcess = (props) => {
  const {
    batches,
    setBatches,
    processCount,
    setProcessCount,
    isDisabled,
    processInEje,
  } = props;

  const [name, setName] = useState("");
  const [operation, setOperation] = useState("");
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [idProgram, setIdProgram] = useState(0);

  useEffect(()=> {
    if(processInEje !== undefined && isDisabled) {
      setName(processInEje.name);
      setOperation(processInEje.operation);
      setNumber1(processInEje.number1);
      setNumber2(processInEje.number2);
      setMaxTime(processInEje.maxTime);
      setIdProgram(processInEje.idProgram);
    }
  },[])
  

  const handleCapture = () => {
    const newProcess = {
      name: name,
      operation: operation,
      number1: number1,
      number2: number2,
      maxTime: maxTime,
      idProgram: idProgram,
    };

    const lastBatch = batches[batches.length - 1];
    if (batches.length === 0 || lastBatch.length === 4) {
      setBatches([...batches, [newProcess]]);
    } else {
      const updatedLastBatch = [...lastBatch, newProcess];
      const newBatches = [...batches.slice(0, -1), updatedLastBatch];
      setBatches(newBatches);
    }

    setProcessCount(processCount + 1);

    setName("");
    setOperation("Addition");
    setNumber1(0);
    setNumber2(0);
    setMaxTime(0);
    setIdProgram(idProgram + 1);
  };

  const operations = [
    "Addition",
    "Subtraction",
    "Miltiplication",
    "Division",
    "Remainder",
    "Power",
  ];

  return (
    <>
      <h2 className="card__title">Process Information</h2>
      <label className="card__label">Programmer's name</label>
      <input
        type="text"
        placeholder="ed"
        className="card__input"
        value={name}
        disabled={isDisabled}
        onChange={(e) => setName(e.target.value)}
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
      <label className="card__label">Program number</label>
      <input
        type="number"
        placeholder="1"
        className="card__input"
        value={idProgram}
        disabled
        onChange={(e) => setIdProgram(e.target.value)}
      />
      {!isDisabled ? (
        <button className="card__button" onClick={handleCapture}>
          Capture
        </button>
      ) : null}
    </>
  );
};

export default FormProcess;
