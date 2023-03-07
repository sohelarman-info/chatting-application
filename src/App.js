import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Forget from "./pages/forgotpassword";
import Home from "./pages/home";
import RootLayout from "./pages/Layout";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Url from "./pages/route";
import Loggedin from "./privaterouter/Loggedinuser";
import Notloggedin from "./privaterouter/Notloggedin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Loggedin />}>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/url" element={<Url />}></Route>
          </Route>
        </Route>
        <Route element={<Notloggedin />}>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgetpassword" element={<Forget />}></Route>
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
