import React from "react";

const ShowResult = ({ process, isError, result }) => {
  return (
    <div>
      {process !== undefined && !isError
        ? "id: " +
          process.idProgram +
          " → " +
          process.number1 +
          " " +
          process.operation +
          " " +
          process.number2 +
          " = " +
          result
        : "id: " +
          process.idProgram +
          " → " +
          process.number1 +
          " " +
          process.operation +
          " " +
          process.number2 +
          " = " +
          "Error"}
    </div>
  );
};

export default ShowResult;
