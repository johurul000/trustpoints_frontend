import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Routes, Route } from "react-router-dom";
import Home from "../auth_system/pages/Home";
import Login from "../auth_system/pages/Login";
import DemoLogin from "../auth_system/pages/DemoLogin";
import Register from "../auth_system/pages/Register";
import { verify } from "../features/AuthSlice";
import AvailableApps from "./pages/AvailableApps";
import MyTasks from "./pages/MyTasks";
import CompleteTask from "./pages/CompleteTask";
import ViewTask from "./pages/ViewTask";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function UserApp() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(verify());
  }, [location.pathname, dispatch, isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login/" element={<Login />} />
      <Route path="demo-login/" element={<DemoLogin />} />
      <Route path="register/" element={<Register />} />

      <Route path="apps/" element={<AvailableApps />} />
      <Route path="mytasks/" element={<MyTasks />} />
      <Route path="complete-task/:id" element={<CompleteTask />} />
      <Route path="/view-task/:taskId" element={<ViewTask />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />

    </Routes>
  );
}

export default UserApp;
