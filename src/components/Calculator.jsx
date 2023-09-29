import React, { useEffect, useState } from "react";
import Card from "./Card";

const Calculator = ({ process }) => {
  const [result, setResult] = useState(0);
  const [symbol, setSymbol] = useState("");
  useEffect(() => {
    if (process !== undefined && process.error !== true) {
      switch (process.operation) {
        case "Addition":
          setResult(parseFloat(process.number1) + parseFloat(process.number2));
          setSymbol("+");
          break;
        case "Subtraction":
          setResult(process.number1 - process.number2);
          setSymbol("-");
          break;
        case "Multiplication":
          setResult(process.number1 * process.number2);
          setSymbol("*");
          break;
        case "Division":
          setResult(process.number1 / process.number2);
          setSymbol("/");
          break;
        case "Remainder":
          setResult(process.number1 % process.number2);
          setSymbol("%");
          break;
        case "Power":
          setResult(process.number1 ** process.number2);
          setSymbol("^");
          break;
      }
    }else{
        setResult("ERROR");
    }
  }, [process]);
  return (
    <Card height={"fit-content"} width={"fit-content"} direction={"column"} color={"#d765a0"}>
      <div>
        {process !== undefined ? (
          "ID: " +
          process.idProgram +
          " → " + 
          process.number1 +
          " " +
          symbol +
          " " +
          process.number2 +
          " = " +
          result
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default Calculator;