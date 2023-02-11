import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Loggedin from "./privaterouter/Loggedinuser";
import Notloggedin from "./privaterouter/Notloggedin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Loggedin />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route element={<Notloggedin />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
