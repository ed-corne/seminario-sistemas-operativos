import React, { useState, useEffect } from 'react';

function App2() {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (jobs.length > 0 && !paused) {
        const currentBatch = jobs.slice(0, 3);
        setJobs(jobs.slice(3));

        console.log(`Ejecutando lote con ${currentBatch.length} trabajos:`);

        currentBatch.forEach((job) => {
          setCurrentJob(job);
          executeJob(job);
          setCurrentJob(null);
        });
      } else if (jobs.length === 0) {
        console.log('No hay más lotes pendientes.');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [jobs, paused]);

  const generateJob = () => {
    const jobId = jobs.length + 1;
    const jobTime = Math.floor(Math.random() * 10) + 1;
    const jobOperation = ['+', '-', '*', '/', '%'][Math.floor(Math.random() * 5)];
    const newJob = {
      id: jobId,
      time: jobTime,
      operation: jobOperation,
    };

    setJobs([...jobs, newJob]);
  };

  const executeJob = (job) => {
    console.log(`Ejecutando trabajo ${job.id}`);
    for (let remainingTime = job.time; remainingTime > 0; remainingTime--) {
      if (paused) {
        console.log(`Trabajo ${job.id} en pausa. Tiempo restante: ${remainingTime}`);
        while (paused) {
          // Esperar mientras está pausado
        }
      } else {
        console.log(`Tiempo restante para el trabajo ${job.id}: ${remainingTime}`);
        // Simular tiempo transcurrido
        setTimeout(() => {}, 1000);
      }
    }
    console.log(`Trabajo ${job.id} completado con operación ${job.operation}`);
  };

  const handleInterrupt = (action) => {
    switch (action) {
      case 'I':
        if (currentJob) {
          console.log(`Trabajo ${currentJob.id} movido a la cola`);
          setCurrentJob(null);
        }
        break;
      case 'E':
        if (currentJob) {
          console.log(`Trabajo ${currentJob.id} terminado con error`);
          setCurrentJob(null);
        }
        break;
      case 'P':
        if (currentJob) {
          console.log(`Ejecución del trabajo ${currentJob.id} en pausa`);
          setPaused(true);
        }
        break;
      case 'C':
        if (currentJob && paused) {
          console.log(`Continuando la ejecución del trabajo ${currentJob.id}`);
          setPaused(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>Emulación de Procesamiento por Lotes</h1>
      <button onClick={generateJob}>Generar Trabajo</button>
      <div>
        <strong>Lote en ejecución:</strong>
        <p>Tiempo restante por ejecutar: {currentJob ? currentJob.time : 0}</p>
        <p>Sin lotes pendientes: {jobs.length === 0 ? '0' : 'No'}</p>
      </div>
      <div>
        <strong>Interrupciones por teclado:</strong>
        <button onClick={() => handleInterrupt('I')}>I - Mover a Cola</button>
        <button onClick={() => handleInterrupt('E')}>E - Terminar con Error</button>
        <button onClick={() => handleInterrupt('P')}>P - Pausar</button>
        <button onClick={() => handleInterrupt('C')}>C - Continuar</button>
      </div>
    </div>
  );
}

export default App2;
