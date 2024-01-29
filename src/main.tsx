import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./routes/Homepage.tsx";
import ErrorPage from "./error-page.tsx";
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import { ContextProvider } from "./context/ContextProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
