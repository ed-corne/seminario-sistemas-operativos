import React, { useState } from "react";
import Card from "../components/Card";
import "../styles/card.css";
import { Link } from "react-router-dom";
import FormProcess from "../batches1/FormProcess";
import GenerateProcess from "../multiprogramming/GenerateProcess";
import queryString from "query-string";
import { useParams } from "react-router-dom";

const Process = () => {
  const { page } = useParams();

  console.log(page);

  const [batches, setBatches] = useState([]);
  const [processCount, setProcessCount] = useState(0);

  ///processBatches
  const handleSimulationClick2 = () => {
    const serializedBatches = encodeURIComponent(JSON.stringify(batches));
    const queryParams = queryString.stringify({ batches: serializedBatches });
    if (page === "batches") {
      window.location.href = `/simulation?${queryParams}`;
    }
    if (page === "multiprogramming") {
      window.location.href = `/processBatches?${queryParams}`;
    }
  };

  return (
    <>
      <Card height={"fit-content"} color={page === "batches" ? "#6c8ba7" : "#70cdb2"}>
        {page === "batches" ? (
          <FormProcess
            batches={batches}
            setBatches={setBatches}
            processCount={processCount}
            setProcessCount={setProcessCount}
            isDisabled={false}
            processInEje={null}
          />
        ) : (
          <GenerateProcess
            batches={batches}
            setBatches={setBatches}
            processCount={processCount}
            setProcessCount={setProcessCount}
            isDisabled={false}
            processInEje={null}
          />
        )}

        <button
          onClick={handleSimulationClick2}
          className="card__button --large"
        >
          Ejecutar Trabajos
        </button>
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
