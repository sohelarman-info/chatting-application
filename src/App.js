import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={""}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
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
