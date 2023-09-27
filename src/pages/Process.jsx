import React, { useState } from "react";
import Card from "../components/Card";
import "../styles/card.css";
import { Link } from "react-router-dom";
import FormProcess from "../components/FormProcess";
import queryString from "query-string";

const Process = () => {
  const [batches, setBatches] = useState([]);
  const [processCount, setProcessCount] = useState(0);

  const handleSimulationClick = () => {
    const serializedBatches = encodeURIComponent(JSON.stringify(batches));
    const queryParams = queryString.stringify({ batches: serializedBatches });
    window.location.href = `/simulation?${queryParams}`;
  };

  ///processBatches
  const handleSimulationClick2 = () => {
    const serializedBatches = encodeURIComponent(JSON.stringify(batches));
    const queryParams = queryString.stringify({ batches: serializedBatches });
    window.location.href = `/processBatches?${queryParams}`;
  };

  return (
    <>
      <Card height={"fit-content"}>
        <FormProcess
          batches={batches}
          setBatches={setBatches}
          processCount={processCount}
          setProcessCount={setProcessCount}
          isDisabled={false}
          processInEje={null}
        />
        <button
          onClick={handleSimulationClick}
          className="card__button --large"
        >
          Simulate
        </button>

        <button
          onClick={handleSimulationClick2}
          className="card__button --large"
        >
          Simulate v2
        </button>

        {/*<Link to={'/simulation'} className="card__button --large">
          Simulate
        </Link>*/}
      </Card>

      <div>
        {batches.map((proceso, procesoIndex) => (
          <div key={procesoIndex}>
            <p>Operación: {proceso.operation}</p>
            <p>Num1: {proceso.number1}</p>
            <p>Num2: {proceso.number2}</p>
            <p>max: {proceso.maxTime}</p>
            <p>id: {proceso.idProgram}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Process;
