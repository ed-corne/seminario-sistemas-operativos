import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Card width={500} height={500} direction={"column"}>
        <h2>Batch Processing Simulator</h2>
        <Link to={'/process'}>Start</Link>
      </Card>
    </>
  );
};

export default Home;
