// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./MainPage";
import Login from "./pages/login/Login";
import App from "./App";
import Dashboard from "./pages/dashboard/Dashboard";
import Tasks from "./pages/task/Tasks";
import CreateUser from "./pages/createuser/CreateUser";
import CreateTask from "./pages/task/createtask/CreateTask";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContexts";
import './index.css';
// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <App />, // Render the App component if authenticated
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "tasks",
            element: <Tasks />,
          },
          {
            path: "createuser",
            element: <CreateUser />,
          },
          {
            path: "create-task",
            element: <CreateTask />,
          },
        ],
      },
    ],
  },
]);

// Render the app
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
    
//   </StrictMode>
// );
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>);
} else {
  console.error('Root element not found');
}
