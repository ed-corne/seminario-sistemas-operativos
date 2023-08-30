import React from 'react'

const Process = () => {

  console.log("Inicio");
  var interval = setInterval(function () {
    console.log("Pausa cada 2 segundos");
  }, 2000); // 2000 milisegundos = 2 segundos

  // Para detener el intervalo después de cierto tiempo
  setTimeout(function () {
    clearInterval(interval);
    console.log("Fin");
  }, 10000); // Detiene después de 10 segundos

  const estructura = [
    [
      {
        nombre: "",
        operacion: "",
        num1: 0,
        num2: 0,
      },
      {},
    ],
    [{}],
  ];


  return (
    <div>Process</div>
  )
}

export default Process