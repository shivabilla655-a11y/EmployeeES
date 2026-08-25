import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <i className="bi bi-people-fill"></i>
        </div>

        <div className="sidebar-brand-text">
          <h5>EmployeeMS</h5>
          <span>Management System</span>
        </div>
      </div>

      {/* Main Menu */}
      <div className="sidebar-menu">
        <div className="sidebar-section-title">MAIN</div>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-grid-1x2-fill"></i>

          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-people-fill"></i>
          <span>Employees</span>
        </NavLink>

        <NavLink
          to="/department"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-building-fill"></i>
          <span>Departments</span>
        </NavLink>

        <NavLink
          to="/position"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-briefcase-fill"></i>
          <span>Positions</span>
        </NavLink>

        {/* Administration */}

        <div className="sidebar-section-title">ADMINISTRATION</div>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-person-gear"></i>
          <span>Users</span>
        </NavLink>

        {/* Account */}

        <div className="sidebar-section-title">ACCOUNT</div>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-person-circle"></i>
          <span>My Profile</span>
        </NavLink>
      </div>

      {/* Bottom Menu */}

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-gear-fill"></i>
          <span>Settings</span>
        </NavLink>

        <button type="button" className="sidebar-link sidebar-logout">
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
