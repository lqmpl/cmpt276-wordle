import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Classic from './pages/Classic';
import Timed from './pages/Timed';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/classic",
    element: <Classic />,
  },
  {
    path: "/timed",
    element: <Timed />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <RouterProvider router={router} />
    </>
);

