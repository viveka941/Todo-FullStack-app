import { Toaster } from "sonner";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./User/Login";
import RegisterPage from "./User/RegisterPage";
import UserDashboard from "./User/UserDashboard";
import Assist from "./User/Assist";

const routerApp = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <RegisterPage /> },
  {path:"/userProfile/:id",element:<UserDashboard/>},
  {path:"/assist",element:<Assist/>}
]);

function App() {
  return (
    <>
      <RouterProvider router={routerApp} />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
