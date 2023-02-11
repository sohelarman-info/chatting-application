import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

export default function Loggedin() {
  const user = useSelector((users) => users.loginSlice.login);
  return user ? <Outlet /> : <Login />;
}
