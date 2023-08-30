import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx';
import Process from './pages/Process.jsx';
import Simulation from './pages/Simulation.jsx';
import Error from './pages/Error.jsx';
// import react router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <Error/>
  },
  {
    path: '/process',
    element: <Process/>,
  },
  {
    path: '/simulation',
    element: <Simulation/>,
  
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
