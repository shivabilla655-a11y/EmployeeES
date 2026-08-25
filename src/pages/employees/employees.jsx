import { useState, useEffect } from "react";
import {
  employeeService,
  deleteEmployeeService,
} from "../../services/employee.Service.js";
import "./employees.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(2);
  const [openMenu, setOpenMenu] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await employeeService();
      if (response.success) {
        setEmployees(response.data);
      } else {
        setError("Failed to fetch employees.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when employees change
    fetchEmployees();
  }, []);

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.IsActive).length;
  const inactiveEmployees = totalEmployees - activeEmployees;
  const averageSalary =
    totalEmployees > 0
      ? employees.reduce(
          (total, employee) => total + Number(employee.Salary || 0),
          0,
        ) / totalEmployees
      : 0;
  const averageSalaryPercentage = (averageSalary / 100000) * 100;

  const filterEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();
    return (
      employee.EmployeeName?.toLowerCase().includes(search) ||
      employee.EmployeeCode?.toLowerCase().includes(search) ||
      employee.DepartmentName?.toLowerCase().includes(search) ||
      employee.PositionName?.toLowerCase().includes(search) ||
      employee.Email?.toLowerCase().includes(search) ||
      employee.Salary?.toString().toLowerCase().includes(search) ||
      (employee.IsActive ? "active" : "inactive").toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filterEmployees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const currentEmployees = filterEmployees.slice(startIndex, endIndex);

  const handleDelete = async (employeeId) => {
  const result = await Swal.fire({
    title: "Delete Employee?",
    text: "Are you sure you want to delete this employee?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    await deleteEmployeeService(employeeId);

    toast.success("Employee deleted successfully");

    await fetchEmployees();
  } catch (error) {
    console.error("Delete error:", error);

    toast.error(
      error.response?.data?.message ||
        "Failed to delete employee"
    );
  }
};
  return (
    <div className="employees-page">
      {/* ================================
                PAGE HEADER
            ================================= */}

      <div className="employees-page-header">
        <div>
          <div className="employees-title-row">
            <div className="employees-title-icon">
              <i className="bi bi-people-fill"></i>
            </div>

            <div>
              <h1>Employees </h1>

              <p>Manage and monitor your organization employees.</p>
            </div>
          </div>
        </div>

        <button
          className="add-employee-btn"
          type="button"
          onClick={() => navigate("/add-employee")}
        >
          <i className="bi bi-plus-lg"></i>
          Add Employee
        </button>
      </div>

      {/* ================================
                EMPLOYEE STATISTICS
            ================================= */}

      <div className="employee-summary">
        <div className="employee-summary-card">
          <div className="summary-icon blue">
            <i className="bi bi-people-fill"></i>
          </div>

          <div>
            <span>Total Employees</span>
            <h3>{totalEmployees}</h3>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="summary-icon green">
            <i className="bi bi-person-check-fill"></i>
          </div>

          <div>
            <span>Active Employees</span>
            <h3>{activeEmployees}</h3>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="summary-icon orange">
            <i className="bi bi-person-x-fill"></i>
          </div>

          <div>
            <span>Inactive Employees</span>
            <h3>{inactiveEmployees}</h3>
          </div>
        </div>

        <div className="employee-summary-card">
          <div className="summary-icon purple">
            <i className="bi bi-cash-stack"></i>
          </div>

          <div>
            <span>Average Salary</span>
            <h3>₹{Number(averageSalary).toLocaleString("en-IN")}</h3>
          </div>
        </div>
      </div>

      {/* ================================
                EMPLOYEE TABLE CARD
            ================================= */}

      <div className="employees-table-card">
        {/* Table Header */}

        <div className="employees-table-header">
          <div>
            <h2>Employee Directory</h2>

            <p>View and manage all employees.</p>
          </div>

          <div className="employee-header-actions">
            {/* Search */}

            <div className="employee-search">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}

            <button className="employee-filter-btn">
              <i className="bi bi-funnel"></i>
              Filter
            </button>
          </div>
        </div>

        {/* Table */}

        <div className="employee-table-wrapper">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>

                <th>Email</th>

                <th>Position</th>

                <th>Department</th>

                <th>Salary</th>

                <th>Status</th>

                <th>Actionsss</th>
              </tr>
            </thead>

            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee) => (
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

                    <td>{employee.Email}</td>

                    <td>
                      <span className="position-badge">
                        {employee.PositionName}
                      </span>
                    </td>

                    <td>{employee.DepartmentName}</td>

                    <td>
                      ₹{Number(employee.Salary || 0).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${
                          employee.IsActive ? "active" : "inactive"
                        }`}
                      >
                        <span className="status-dot"></span>
                        {employee.IsActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="position-relative">
                      <button
                        className="employee-action-btn"
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === employee.EmployeeId
                              ? null
                              : employee.EmployeeId,
                          )
                        }
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>

                      {openMenu === employee.EmployeeId && (
                        <div className="employee-action-menu">
                          {/* EDIT */}
                          <button
                            type="button"
                            className="employee-menu-item"
                            onClick={() => {
                              setOpenMenu(null);

                              navigate(`/edit-employee/${employee.EmployeeId}`);
                            }}
                          >
                            <i className="bi bi-pencil-square"></i>
                            <span>Edit</span>
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            className="employee-menu-item delete-item"
                            onClick={() => {
                              setOpenMenu(null);

                              handleDelete(employee.EmployeeId);
                            }}
                          >
                            <i className="bi bi-trash"></i>
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="employee-empty-row">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}

        <div className="employee-pagination">
          <span>
            Showing{" "}
            <strong>
              {filterEmployees.length == 0 ? 0 : startIndex + 1} -{" "}
              {Math.min(endIndex, filterEmployees.length)}
            </strong>{" "}
            of <strong>{filterEmployees.length}</strong>
            employees
          </span>

          <div className="pagination-buttons">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
