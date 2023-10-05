import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx';
import Process from './pages/Process.jsx';
import Simulation from './batches1/Simulation';
import Error from './pages/Error.jsx';
// import react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProcessBatches from './multiprogramming/ProcessBatches';
import SimulationFCFS from './FCFS/SimulationFCFS';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <Error/>
  },
  {
    path: '/process/:page',
    element: <Process/>,
  },
  {
    path: '/simulation',
    element: <Simulation/>,
  },
  {
    path: '/processBatches',
    element: <ProcessBatches/>,
  },
  {
    path: '/simulation-fcfs',
    element: <SimulationFCFS/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
