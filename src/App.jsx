import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginAndSignUp from "./pages/LoginAndSignup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Todo from "./pages/Todo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginAndSignUp />,
    },
    {
      path: "/login",
      element: <LoginAndSignUp />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/todo/:todoId",
      element: <Todo />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
