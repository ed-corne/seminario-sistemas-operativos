import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Card width={500} height={500} direction={"column"} color={"#a8c5eb"}>
        <h2>Simulador de Multiprogramación</h2>
        <Link to={'/process'}>Iniciar</Link>
      </Card>
    </>
  );
};

export default Home;
