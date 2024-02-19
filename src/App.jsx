import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Marketing from "./pages/Marketing";
import CreateLoan from "./pages/CreateLoan";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/marketing",
    element: <Marketing />,
  },
  {
    path: "/loans/create",
    element: <CreateLoan />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
