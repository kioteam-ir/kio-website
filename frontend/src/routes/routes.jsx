// src/routes/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);