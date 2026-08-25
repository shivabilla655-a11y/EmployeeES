import { useState } from "react";
import { logoutUser } from "../../services/auth.service.js";
import "./navbar.css";
 
function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  const userName = localStorage.getItem("userName") || "User";
  const userRole = localStorage.getItem("userRole") || "Employee";

  const handleLogout = async () => {
    console.log("1. Logout button clicked");

    try {
      console.log("2. Calling logoutUser");

      const response = await logoutUser();

      console.log("3. Logout response:", response);

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userName");
      localStorage.removeItem("userRole");

      window.location.href = "/login";
    } catch (error) {
      console.error("4. Logout failed:", error);
    }
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="sidebar-toggle"
          aria-label="Toggle sidebar"
        >
          <i className="bi bi-list"></i>
        </button>

        <div className="navbar-page-info">
          <h6>Employee Management</h6>
          <span>Management Dashboard</span>
        </div>
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="navbar-icon-button"
          title="Notifications"
        >
          <i className="bi bi-bell"></i>
          <span className="notification-dot"></span>
        </button>

        <div className="navbar-divider"></div>

        <div className="navbar-profile-wrapper">
          <button
            type="button"
            className="navbar-profile"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="navbar-avatar">
              <i className="bi bi-person-fill"></i>
            </div>

            <div className="navbar-user-info">
              <strong>{userName}</strong>
              <span>{userRole}</span>
            </div>

            <i
              className={`bi ${
                showProfile ? "bi-chevron-up" : "bi-chevron-down"
              } navbar-chevron`}
            ></i>
          </button>

          {showProfile && (
            <div className="navbar-profile-dropdown">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">
                  <i className="bi bi-person-fill"></i>
                </div>

                <div>
                  <strong>{userName}</strong>
                  <span>{userRole}</span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button type="button" className="dropdown-item-custom" >
                <i className="bi bi-person-circle"></i>
                My Profile
              </button>

              <button type="button" className="dropdown-item-custom">
                <i className="bi bi-gear"></i>
                Settings
              </button>

              <div className="dropdown-divider"></div>

              <button
                type="button"
                className="dropdown-item-custom logout-item"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                Logout ss
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
