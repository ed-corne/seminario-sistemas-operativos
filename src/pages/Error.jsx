import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  // provide the error that is thrown.
  const error = useRouteError();
  // throw the error to the console
  console.error(error);
  
  return (
    <div id="errorPage">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.status} </i>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
