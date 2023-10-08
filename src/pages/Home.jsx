import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Card width={"fit-content"} height={"fit-content"} >
      <Card width={300} height={300} direction={"column"} color={"#a8c5eb"}>
        <h2>Procesamiento por Lotes</h2>
        <Link to={'/process/batches'}>Iniciar</Link>
      </Card>
      <Card width={300} height={300} direction={"column"} color={"#abbebf"}>
        <h2>Simulador de Multiprogramación</h2>
        <Link to={'/process/multiprogramming'}>Iniciar</Link>
      </Card>
      <Card width={300} height={300} direction={"column"} color={"#f8c4cd"}>
        <h2>Algoritmo de planificación FCFS</h2>
        <Link to={'/process/fcfs'}>Iniciar</Link>
      </Card>
      <Card width={300} height={300} direction={"column"} color={"#c7cfdb"}>
        <h2>Algoritmo de planificación Round Robin</h2>
        <Link to={'/process/rr'}>Iniciar</Link>
      </Card>
      </Card>
  );
};

export default Home;
