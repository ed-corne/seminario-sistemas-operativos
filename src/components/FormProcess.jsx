import React from "react";

const FormProcess = () => {
    const operations = [
        "Addition",
        "Subtraction",
        "Miltiplication",
        "Division",
        "Remainder",
        "Power",
      ];
  return (
    <>
      <h2 className="card__title">Process Information</h2>
      <label className="card__label">Programmer's name</label>
      <input type="text" placeholder="ed" className="card__input" />
      <label className="card__label">Operation</label>
      <input type="number" placeholder="num 1" className="card__input" />
      <select className="card__select">
        {operations.map((operation, index) => (
          <option key={index} className="select__option">
            {operation}
          </option>
        ))}
      </select>

      <input type="number" placeholder="num 2" className="card__input" />
      <label className="card__label">Maximum estimated time</label>
      <input type="number" placeholder="3" className="card__input" />
      <label className="card__label">Program number</label>
      <input type="number" placeholder="1" className="card__input" />
    </>
  );
};

export default FormProcess;
