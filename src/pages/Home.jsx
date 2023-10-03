import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Card width={"fit-content"} height={"fit-content"} >
      <Card width={500} height={500} direction={"column"} color={"#a8c5eb"}>
        <h2>Procesamiento por Lotes</h2>
        <Link to={'/process/batches'}>Iniciar</Link>
      </Card>
      <Card width={500} height={500} direction={"column"} color={"#abbebf"}>
        <h2>Simulador de Multiprogramación</h2>
        <Link to={'/process/multiprogramming'}>Iniciar</Link>
      </Card>
      </Card>
  );
};

export default Home;
