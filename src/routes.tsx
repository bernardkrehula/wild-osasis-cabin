import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
]);
export default router;
