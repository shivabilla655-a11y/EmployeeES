import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MainLayout from "../layouts/MainLayouts";
import ErrorPage from "../pages/error/ErrorPage";
import Dashboard from "../pages/dashboard/Dashboard";
import Employees from "../pages/employees/employees";
import AddEmployee from "../pages/employees/AddEmployee";
import Department from "../pages/department/department";
import Position from "../pages/position/position";
import Users from "../pages/user/users";
import Profile from "../pages/profile/profile";
import Settings from "../pages/settings/settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<AddEmployee />} />
          <Route path="/department" element={<Department />} />
          <Route path="/position" element={<Position />} />
          <Route path="/users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={ <Settings/> } />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
