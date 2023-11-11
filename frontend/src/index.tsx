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
    path: "/pages/Signup.tsx",
    element: <Signup />,
  },
  {
    path: "/pages/Login.tsx",
    element: <Login />,
  },
  {
    path: "/pages/Classic.tsx",
    element: <Classic />,
  },
  {
    path: "/pages/Timed.tsx",
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