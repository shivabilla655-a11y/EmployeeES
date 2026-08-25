import "./Dashboard.css";
import { useEffect, useState } from "react";
import { dashboardService } from "../../services/dashboard.Serice";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.fullName || "User";
  const formattedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [dashboard, setDashboard] = useState(null);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const response = await dashboardService();

        if (response.success) {
          setDashboard(response.data.summary);
          console.log(response);
          setRecentEmployees(response.data.recentEmployees);
        } else {
          setError(response.message || "Failed to load dashboard");
        }
      } catch (error) {
        console.error("Dashboard Load Error:", error);

        setError(
          error.response?.data?.message || "Unable to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);
  const highestSalary = Number(dashboard?.HighestSalary ?? 0);
  const averageSalary = Number(dashboard?.AverageSalary ?? 0);

  const averageSalaryPercentage =
    highestSalary > 0
      ? Math.min((averageSalary / highestSalary) * 100, 100)
      : 0;

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <i className="bi bi-exclamation-circle"></i>

        <h3>Unable to load dashboard</h3>

        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="dashboard-page">
      {/* ================================
                PAGE HEADER
            ================================= */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back {userName}! Here's what's happening with your
            organization today.
          </p>
        </div>

        <div className="dashboard-date">
          <i className="bi bi-calendar3"></i>
          <span>{formattedDate}</span>
        </div>
      </div>

      {/* ================================
                STATISTICS
            ================================= */}

      <div className="dashboard-stats">
        {/* Employees */}

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon employees-icon">
              <i className="bi bi-people-fill"></i>
            </div>

            <span className="stat-growth positive">
              <i className="bi bi-arrow-up"></i>
              12.5%
            </span>
          </div>

          <div className="stat-content">
            <span className="stat-label">Total Employees</span>

            <h2>{dashboard?.TotalEmployees || 0}</h2>

            <span className="stat-description">Compared to last month</span>
          </div>
        </div>

        {/* Departments */}

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon departments-icon">
              <i className="bi bi-building"></i>
            </div>

            <span className="stat-growth positive">
              <i className="bi bi-arrow-up"></i>
              8.2%
            </span>
          </div>

          <div className="stat-content">
            <span className="stat-label">Departments</span>

            <h2>{dashboard?.TotalDepartments || 0}</h2>

            <span className="stat-description">Active departments</span>
          </div>
        </div>

        {/* Positions */}

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon positions-icon">
              <i className="bi bi-briefcase-fill"></i>
            </div>

            <span className="stat-growth positive">
              <i className="bi bi-arrow-up"></i>
              5.4%
            </span>
          </div>

          <div className="stat-content">
            <span className="stat-label">Positions</span>

            <h2>{dashboard?.TotalPositions || 0}</h2>

            <span className="stat-description">Available positions</span>
          </div>
        </div>

        {/* Users */}

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon users-icon">
              <i className="bi bi-person-check-fill"></i>
            </div>

            <span className="stat-growth positive">
              <i className="bi bi-arrow-up"></i>
              4.8%
            </span>
          </div>

          <div className="stat-content">
            <span className="stat-label">System Users</span>

            <h2>{dashboard?.TotalUsers || 0}</h2>

            <span className="stat-description">Registered users</span>
          </div>
        </div>
      </div>

      {/* ================================
                MIDDLE SECTION
            ================================= */}

      <div className="dashboard-middle">
        {/* Salary Overview */}

        <div className="dashboard-card salary-card">
          <div className="dashboard-card-header">
            <div>
              <h3>Salary Overview</h3>

              <p>Employee salary statistics</p>
            </div>

            <div className="card-header-icon">
              <i className="bi bi-currency-rupee"></i>
            </div>
          </div>

          <div className="salary-content">
            <div className="salary-item">
              <span className="salary-label">Highest Salary</span>

              <strong>
                {dashboard?.HighestSalary
                  ? `₹${dashboard.HighestSalary.toLocaleString()}`
                  : "₹0"}
              </strong>
            </div>

            <div className="salary-item">
              <span className="salary-label">Average Salary</span>

              <strong>
                {dashboard?.AverageSalary
                  ? `₹${dashboard.AverageSalary.toLocaleString()}`
                  : "₹0"}
              </strong>
            </div>

            <div className="salary-item">
              <span className="salary-label">Lowest Salary</span>

              <strong>
                {dashboard?.LowestSalary
                  ? `₹${dashboard.LowestSalary.toLocaleString()}`
                  : "₹0"}
              </strong>
            </div>
          </div>

          {/* Salary Progress */}

          <div className="salary-progress-section">
            <div className="progress-header">
              <span>Average salary</span>

              <span>{averageSalaryPercentage.toFixed(0)}%</span>
            </div>

            <div className="salary-progress">
              <div
                className="salary-progress-bar"
                style={{ width: `${averageSalaryPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Employee Overview */}

        <div className="dashboard-card employee-overview-card">
          <div className="dashboard-card-header">
            <div>
              <h3>Employee Overview</h3>

              <p>Current workforce status</p>
            </div>

            <div className="card-header-icon">
              <i className="bi bi-bar-chart-fill"></i>
            </div>
          </div>

          {/* <div className="employee-overview">
            <div className="overview-circle">
              <div className="circle-inner">
                <strong>{dashboard?.TotalEmployees || 0}</strong>

                <span>Employees</span>
              </div>
            </div>

            <div className="overview-legend">
              <div className="legend-item">
                <span className="legend-dot active"></span>

                <div>
                  <strong>{dashboard.ActiveEmployees || 0}</strong>
                  <span>Active</span>
                </div>
              </div>

              <div className="legend-item">
                <span className="legend-dot inactive"></span>

                <div>
                  <strong>{dashboard.InActiveEmployees || 0}</strong>
                  <span>Inactive</span>
                </div>
              </div>
            </div> */}
          {/* </div> */}
          <div className="employee-overview">
            <div
              className="overview-circle"
              style={{
                background: `conic-gradient(
        #0d6efd 0% ${
          dashboard?.TotalEmployees
            ? (dashboard.ActiveEmployees / dashboard.TotalEmployees) * 100
            : 0
        }%,
        rgba(255, 255, 255, 0.08) ${
          dashboard?.TotalEmployees
            ? (dashboard.ActiveEmployees / dashboard.TotalEmployees) * 100
            : 0
        }% 100%
      )`,
              }}
            >
              <div className="circle-inner">
                <strong>{dashboard?.TotalEmployees || 0}</strong>
                <span>Employees</span>
              </div>
            </div>

            <div className="overview-legend">
              <div className="legend-item">
                <span className="legend-dot active"></span>

                <div>
                  <strong>{dashboard?.ActiveEmployees || 0}</strong>
                  <span>Active</span>
                </div>
              </div>

              <div className="legend-item">
                <span className="legend-dot inactive"></span>

                <div>
                  <strong>{dashboard?.InActiveEmployees || 0}</strong>
                  <span>Inactive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================
                RECENT EMPLOYEES
            ================================= */}

      <div className="dashboard-card recent-employees-card">
        <div className="dashboard-card-header">
          <div>
            <h3>Recent Employees</h3>

            <p>Recently added employees</p>
          </div>

          <button type="button" className="view-all-button">
            View All
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        <div className="employee-table-wrapper">
          <table className="dashboard-employee-table">
            <thead>
              <tr>
                <th className="td-position">Employee</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentEmployees.length > 0 ? (
                recentEmployees.map((employee) => (
                  <tr key={employee.EmployeeId}>
                    <td>
                      <div className="employee-info">
                        <div className="employee-avatar">
                          {employee.EmployeeName?.split(" ")
                            .map((name) => name[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <strong>{employee.EmployeeName}</strong>
                          <span>{employee.EmployeeCode}</span>
                        </div>
                      </div>
                    </td>
                    <td>{employee.PositionName}</td>

                    <td>{employee.DepartmentName}</td>

                    <td>₹{Number(employee.Salary).toLocaleString("en-IN")}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          employee.IsActive
                            ? "active-status"
                            : "inactive-status"
                        }`}
                      >
                        {employee.IsActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" classname="no-data">
                    No recently joined employees
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
