import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Routes, Route } from "react-router-dom";
import AdminLogin from "../auth_system/pages/AdminLogin";
import { verifyAdmin } from "../features/adminAuthSlice";
import AddApp from "./pages/AddApp";
import AdminApps from "./pages/AdminApps";
import EditApp from "./pages/EditApp";
import AllAdmins from "./pages/AllAdmins";
import CreateAdmin from "./pages/CreateAdmin";
import UpdateOtherAdmin from "./pages/UpdateOtherAdmin";
import AdminSettings from "./pages/AdminSettings";
import EditAdminProfile from "./pages/EditAdminProfile";
import VerifyTasks from "./pages/VerifyTasks";
import ViewTask from "./pages/ViewTask";
import AdminDemoLogin from "../auth_system/pages/AdminDemoLogin";


function AdminApp() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminAuthenticated = useSelector((state) => state.adminAuth.isAdminAuthenticated);

  useEffect(() => {
    dispatch(verifyAdmin());
  }, [location.pathname, dispatch]);

  return (
    <Routes>
      <Route path="apps/" element={<AdminApps />} />
      <Route path="login/" element={<AdminLogin />} />
      <Route path="demo-login/" element={<AdminDemoLogin />} />
      <Route path="add_app/" element={<AddApp />} />
      <Route path="edit_app/:id" element={<EditApp />} />

      <Route path="admins/" element={<AllAdmins />} />
      <Route path="add-admin/" element={<CreateAdmin />} />
      <Route path="update-other-admin/:id" element={<UpdateOtherAdmin />} />
      <Route path="settings/" element={<AdminSettings />} />
      <Route path="edit-profile/" element={<EditAdminProfile />} />

      <Route path="verify-tasks/" element={<VerifyTasks />} />
      <Route path="/view-task/:taskId" element={<ViewTask />} />



    </Routes>
  );
}

export default AdminApp;
