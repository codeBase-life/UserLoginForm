import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import UserAuth from "./UserAuthentication.jsx";
import UserAuth from "./SignUp";
import App from "./App.jsx";
import SignIn from "./SignIn.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "SignUp",
    element: <UserAuth />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
