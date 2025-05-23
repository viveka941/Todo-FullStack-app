import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";

const routerApp = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
 return <RouterProvider router = {routerApp}/>
}

export default App;
