import queryString from "query-string";

export const nextPageWithData = (data, page) => {
  const serialized = encodeURIComponent(JSON.stringify(data));
  const queryParams = queryString.stringify({
    data: serialized,
  });
  window.location.href = `/${page}?${queryParams}`;
};

// function for detecting the keyboard
export const handleKeyPress = (
  event,
  currentProcess,
  interrupProcess,
  errorProcess,
  addProcess,
  setPaused,
  showTable
) => {
  if (currentProcess) {
    switch (event.key) {
      case "E":
      case "e":
        interrupProcess();
        break;
      case "W":
      case "w":
        errorProcess();
        break;
      case "P":
      case "p":
        // Detener la ejecución del proceso actual
        setPaused(true);
        break;
      case "C":
      case "c":
        // Continuar la ejecución del programa si se pausó previamente
        setPaused(false);
        break;
      case "N":
      case "n":
        addProcess();
        break;
      case "B":
      case "b":
        showTable();
      default:
        break;
    }
  }
};
