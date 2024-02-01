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
import Mainlayout from "./routes/MainLayout.tsx";
import NoChatpage from "./routes/NoChatPage.tsx";
import InviteUser from "./routes/InviteUser.tsx";
import MessagesPage from "./routes/MessagesPage.tsx";
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
  {
    path: "/mainpage",
    element: <Mainlayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "nochat",
        element: <NoChatpage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "adduser",
        element: <InviteUser />,
        errorElement: <ErrorPage />,
      },
      {
        path: "messages",
        element: <MessagesPage />,
        errorElement: <ErrorPage />,
      },
    ],
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
