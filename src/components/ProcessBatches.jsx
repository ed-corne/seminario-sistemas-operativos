import React, { useState, useEffect } from 'react';

function App() {
  const [processQueue, setProcessQueue] = useState([]);
  const [currentProcess, setCurrentProcess] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const processInterval = setInterval(() => {
      if (!paused) {
        if (currentProcess) {
          // Procesar el proceso actual
          const result = executeOperation(currentProcess);
          console.log(`Proceso ${currentProcess.id}: ${result}`);

          // Eliminar el proceso actual de la cola
          setProcessQueue((prevQueue) => prevQueue.slice(1));
          setCurrentProcess(null);
        }

        // Obtener el siguiente proceso de la cola
        const nextProcess = processQueue[0];
        if (nextProcess) {
          setCurrentProcess(nextProcess);
        } else {
          clearInterval(processInterval);
          console.log('La cola de procesos está vacía.');
        }
      }
    }, 3000);

    return () => clearInterval(processInterval);
  }, [processQueue, currentProcess, paused]);

  const executeOperation = (process) => {
    const { num1, num2, operation } = process;
    let result;
    switch (operation) {
      case 'suma':
        result = num1 + num2;
        break;
      case 'resta':
        result = num1 - num2;
        break;
      case 'multiplicacion':
        result = num1 * num2;
        break;
      case 'division':
        result = num1 / num2;
        break;
      default:
        result = 'Operación no válida';
    }
    return result;
  };

  const handleKeyPress = (event) => {
    if (currentProcess) {
      switch (event.key) {
        case 'I':
          // Pasar el proceso actual a la cola
          setProcessQueue((prevQueue) => [...prevQueue, currentProcess]);
          setCurrentProcess(null);
          break;
        case 'E':
          // Marcar el proceso actual como error y eliminarlo de la cola
          console.log(`Proceso ${currentProcess.id} marcado como error.`);
          setProcessQueue((prevQueue) => prevQueue.slice(1));
          setCurrentProcess(null);
          break;
        case 'P':
          // Detener la ejecución del proceso actual
          setPaused(true);
          break;
        case 'C':
          // Continuar la ejecución del programa si se pausó previamente
          setPaused(false);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentProcess]);

  const addProcess = () => {
    // Simplemente agrega un nuevo proceso de ejemplo a la cola
    const newProcess = {
      id: processQueue.length + 1,
      num1: Math.random() * 10,
      num2: Math.random() * 10,
      operation: ['suma', 'resta', 'multiplicacion', 'division'][Math.floor(Math.random() * 4)],
    };
    setProcessQueue((prevQueue) => [...prevQueue, newProcess]);
  };

  return (
    <div>
      <h1>Cola de Procesos</h1>
      <button onClick={addProcess}>Agregar Proceso</button>
      <p>Proceso Actual: {currentProcess ? `ID ${currentProcess.id}` : 'Ninguno'}</p>
      <p>Cola de Procesos:</p>
      <ul>
        {processQueue.map((process, index) => (
          <li key={index}>{`Proceso ${process.id}: ${process.num1} ${process.operation} ${process.num2}`}</li>
        ))}
      </ul>
      <p>Estado del Programa: {paused ? 'Pausado' : 'Ejecutando'}</p>
      <p>Presiona las teclas I, E, P o C para interactuar.</p>
    </div>
  );
}

export default App;
