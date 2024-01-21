import React, { useState } from "react";
import '../styles/table.css';

const Table = ({ pages, setPages }) => {
  return (
    <div className="mi-contenedor">
    <table className="mi-tabla">
      <thead>
        <tr>
          <th>Número</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        {pages.map((dato, index) => (
          <tr key={index} className={dato === 'Error' ? 'error' : dato === 'Completado' ? 'correct' : 'empty'}>
            <td>{index}</td>
            <td>{dato}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Table;
