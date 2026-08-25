import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEmployee.css";
import {
  addEmployeeService,
  GetEmployeeByIdService,
  updateEmployeeService,
} from "../../services/employee.Service";
import toast from "react-hot-toast";
// import { Department } from "./../department/department.jsx";
import { PositinsDropdown } from "../position/positionDropdown.jsx";

function AddEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const isEditMode = Boolean(id);
  const [formData, setFormData] = useState({
    employeeName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    salary: "",
    experience: "",
    joinDate: "",
    positionId: "",
    departmentId: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEditMode) {
      loadEmployee();
    }
  }, [id]);

  const loadEmployee = async () => {
    try {
      setError("");
      const result = await GetEmployeeByIdService(id);
      const employee = result.data;
      setFormData({
        employeeId: id || 0,
        employeeName: employee.EmployeeName || "",
        email: employee.Email || "",
        phone: employee.Phone || "",
        gender: employee.Gender || "",
        dob: employee.DOB ? employee.DOB.substring(0, 10) : "",
        address: employee.Address || "",
        salary: employee.Salary || "",
        experience: employee.Experience || "",
        joinDate: employee.JoinDate ? employee.JoinDate.substring(0, 10) : "",
        positionId: employee.PositionId || "",
        departmentId: employee.DepartmentId || "",
      });
    } catch (error) {
      console.error("Error loading employee:", error);

      setError(error.response?.data?.message || "Failed to load employee.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setError("");
    console.log(
      isEditMode ? "Updating Employee:" : "Adding Employee:",
      formData,
    );

    try {
      let response;

      if (isEditMode) {
        response = await updateEmployeeService(id, formData);

        console.log("Employee updated:", response);

        toast.success("Employee updated successfully");
      } else {
        response = await addEmployeeService(formData);

        console.log("Employee added:", response);

        toast.success("Employee added successfully");
      }
      navigate("/employees");
    } catch (error) {
      console.error(
        isEditMode ? "Error updating employee:" : "Error adding employee:",
        error,
      );

      setError(
        error.response?.data?.message ||
          (isEditMode
            ? "Failed to update employee."
            : "Failed to add employee."),
      );
    }
  };

  return (
    <div className="add-employee-page">
      {/* Page Header */}
      <div className="add-employee-header">
        <div className="add-employee-title">
          <div className="add-employee-title-icon">
            <i className="bi bi-person-plus-fill"></i>
          </div>

          <div>
            <h1>{isEditMode ? "Edit Employee" : "Add Employee"}</h1>
            <p>
              {isEditMode
                ? "Update employee information."
                : "Add a new employee to your organization."}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="back-employee-btn"
          onClick={() => navigate("/employees")}
        >
          <i className="bi bi-arrow-left"></i>
          Back to Employees
        </button>
      </div>

      {/* Form Card */}
      <div className="add-employee-card">
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section">
            <div className="form-section-header">
              <div className="form-section-icon">
                <i className="bi bi-person-vcard-fill"></i>
              </div>

              <div>
                <h2>Basic Information</h2>
                <p>Enter the employee's personal information.</p>
              </div>
            </div>

            <div className="form-grid">
              {/* Employee Name */}
              <div className="form-group">
                <label>
                  Employee Name
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-person"></i>

                  <input
                    type="text"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label>
                  Email
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-envelope"></i>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>
                  Phone
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-telephone"></i>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="form-group">
                <label>
                  Gender
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-gender-ambiguous"></i>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>

                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* DOB */}
              <div className="form-group">
                <label>
                  Date of Birth
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-calendar"></i>

                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="form-group full-width">
                <label>
                  Address
                  <span>*</span>
                </label>

                <div className="custom-textarea">
                  <i className="bi bi-geo-alt"></i>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter employee address"
                    rows="3"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="form-section">
            <div className="form-section-header">
              <div className="form-section-icon">
                <i className="bi bi-briefcase-fill"></i>
              </div>

              <div>
                <h2>Employment Information</h2>
                <p>Enter the employee's organization details.</p>
              </div>
            </div>

            <div className="form-grid">
              {/* Salary */}
              <div className="form-group">
                <label>
                  Salary
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-currency-rupee"></i>

                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="form-group">
                <label>
                  Experience
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-award"></i>

                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Years of experience"
                    min="0"
                    step="0.1"
                    required
                  />
                </div>
              </div>

              {/* Join Date */}
              <div className="form-group">
                <label>
                  Join Date
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-calendar-check"></i>

                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Department */}
              <div className="form-group">
                <label>
                  Department
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-building"></i>

                  {/* <DepartmentDropdown
                    value={formData.DepartmentId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        DepartmentId: e.target.value,
                      })
                    }
                  /> */}
                </div>
              </div>

              {/* Position */}
              <div className="form-group">
                <label>
                  Position
                  <span>*</span>
                </label>

                <div className="custom-input">
                  <i className="bi bi-person-workspace"></i>

                  <PositinsDropdown
                    value={formData.PositionId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        PositionId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="add-employee-error">
              <i className="bi bi-exclamation-circle"></i>
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-employee-btn"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-employee-btn"
              onClick={handleSubmit}
            >
              <i className="bi bi-check-lg"></i>
              {isEditMode ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
