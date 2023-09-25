export const calculator = ({ actualProcess }) => {
  let result = 0;
  let symbol = "";
  if (actualProcess !== undefined) {
    switch (actualProcess.operation) {
      case "Addition":
        return parseFloat(actualProcess.number1) + parseFloat(actualProcess.number2);
      case "Subtraction":
        return actualProcess.number1 - actualProcess.number2;
      case "Multiplication":
        return actualProcess.number1 * actualProcess.number2;
      case "Division":
        return actualProcess.number1 / actualProcess.number2;
      case "Remainder":
        return actualProcess.number1 % actualProcess.number2;
    }
  }
};
