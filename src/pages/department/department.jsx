import { useEffect, useState } from "react";
import { departmentService } from "../../services/depatment.Service.js";
// import { ToastContainer, toast } from "react-toastify";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./Department.css";

function Department() {
  // =========================================================
  // STATE
  // =========================================================

  const [departments, setDepartments] = useState([]);

  // Add department
  const [departmentName, setDepartmentName] = useState("");

  // Edit popup
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingDepartmentName, setEditingDepartmentName] =
    useState("");

  // Delete popup
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingDepartmentName, setDeletingDepartmentName] =
    useState("");

  // Loading states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // =========================================================
  // FETCH DEPARTMENTS
  // =========================================================

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const response = await departmentService();

      setDepartments(response.data?.data || response.data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch departments."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // PAGE LOAD
  // =========================================================

  useEffect(() => {
    fetchDepartments();
  }, []);

  // =========================================================
  // ADD DEPARTMENT
  // =========================================================

  const handleAddDepartment = async (e) => {
    e.preventDefault();

    const trimmedName = departmentName.trim();

    if (!trimmedName) {
      toast.error("Department name is required.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/department",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            departmentName: trimmedName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add department."
        );
      }

      // Clear input
      setDepartmentName("");

      // Refresh list
      await fetchDepartments();

      // Success toast
      toast.success(
        data.message || "Department added successfully."
      );
    } catch (error) {
      console.error("Department add error:", error);

      toast.error(
        error.message || "Failed to add department."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const handleEdit = (department) => {
    setEditingId(department.DepartmentId);
    setEditingDepartmentName(department.DepartmentName);
    setShowEditModal(true);
  };

  // =========================================================
  // CLOSE EDIT MODAL
  // =========================================================

  const handleCancelEdit = () => {
    if (saving) return;

    setShowEditModal(false);
    setEditingId(null);
    setEditingDepartmentName("");
  };

  // =========================================================
  // UPDATE DEPARTMENT
  // =========================================================

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();

    const trimmedName = editingDepartmentName.trim();

    if (!trimmedName) {
      toast.error("Department name is required.");
      return;
    }

    if (!editingId) {
      toast.error("Invalid department.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/department/${editingId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            departmentName: trimmedName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update department."
        );
      }

      // Close popup
      setShowEditModal(false);
      setEditingId(null);
      setEditingDepartmentName("");

      // Refresh list
      await fetchDepartments();

      // Success toast
      toast.success(
        data.message || "Department updated successfully."
      );
    } catch (error) {
      console.error("Department update error:", error);

      toast.error(
        error.message || "Failed to update department."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // OPEN DELETE MODAL
  // =========================================================

  const handleDeleteClick = (department) => {
    setDeletingId(department.DepartmentId);
    setDeletingDepartmentName(department.DepartmentName);
    setShowDeleteModal(true);
  };

  // =========================================================
  // CLOSE DELETE MODAL
  // =========================================================

  const handleCancelDelete = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setDeletingId(null);
    setDeletingDepartmentName("");
  };

  // =========================================================
  // DELETE DEPARTMENT
  // =========================================================

  const handleConfirmDelete = async () => {
    if (!deletingId) {
      toast.error("Invalid department.");
      return;
    }

    try {
      setDeleting(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/department/${deletingId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete department."
        );
      }

      // Close popup
      setShowDeleteModal(false);
      setDeletingId(null);
      setDeletingDepartmentName("");

      // Refresh list
      await fetchDepartments();

      // Success toast
      toast.success(
        data.message || "Department deleted successfully."
      );
    } catch (error) {
      console.error("Department delete error:", error);

      toast.error(
        error.message || "Failed to delete department."
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================================================
  // TOTAL DEPARTMENTS
  // =========================================================

  const totalDepartments = departments.length;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="department-page">

      {/* =====================================================
          TOASTER
      ===================================================== */}

      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      /> */}

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="department-page-header">

        <div className="department-header-left">

          <div className="department-title-icon">
            <i className="bi bi-building"></i>
          </div>

          <div>
            <h1>Departments</h1>

            <p>
              Manage and organize your company departments.
            </p>
          </div>

        </div>

        <div className="department-total">
          Total Departments
          <strong>{totalDepartments}</strong>
        </div>

      </div>

      {/* =====================================================
          ADD DEPARTMENT
      ===================================================== */}

      <div className="department-add-section">

        <div className="department-add-icon">
          <i className="bi bi-plus-lg"></i>
        </div>

        <h2>Add Department</h2>

        <p>
          Create a new department for your organization.
        </p>

        <form
          className="department-form"
          onSubmit={handleAddDepartment}
        >

          <div className="department-form-group">

            <label htmlFor="departmentName">
              Department Name
              <span>*</span>
            </label>

            <div className="department-input-wrapper">

              <i className="bi bi-building"></i>

              <input
                id="departmentName"
                type="text"
                placeholder="Enter department name"
                value={departmentName}
                onChange={(e) =>
                  setDepartmentName(e.target.value)
                }
                disabled={saving}
              />

            </div>

          </div>

          <div className="department-form-buttons">

            <button
              type="submit"
              className="department-add-btn"
              disabled={saving || !departmentName.trim()}
            >

              <i
                className={
                  saving
                    ? "bi bi-arrow-repeat department-spin-icon"
                    : "bi bi-plus-lg"
                }
              ></i>

              {saving ? "Adding..." : "Add Department"}

            </button>

          </div>

        </form>

      </div>

      {/* =====================================================
          DIRECTORY CARD
      ===================================================== */}

      <div className="department-directory-card">

        {/* DIRECTORY HEADER */}

        <div className="department-directory-header">

          <div className="department-directory-title">

            <h2>Department Directory</h2>

            <p>
              View and manage all organization departments.
            </p>

          </div>

          <div className="department-directory-count">

            <i className="bi bi-building"></i>

            <span>{totalDepartments}</span>

          </div>

        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="department-table-wrapper">

          <table className="department-table">

            <thead>

              <tr>

                <th>DEPARTMENT</th>

                <th>DEPARTMENT ID</th>

                <th>STATUS</th>

                <th>ACTIONS</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="4"
                    className="department-loading"
                  >

                    <i className="bi bi-arrow-repeat"></i>

                    Loading departments...

                  </td>

                </tr>

              ) : departments.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="department-empty"
                  >

                    <i className="bi bi-building"></i>

                    <span>
                      No departments found.
                    </span>

                  </td>

                </tr>

              ) : (

                departments.map((department) => {

                  const isActive =
                    department.IsActive !== false &&
                    department.IsActive !== 0;

                  return (
                    <tr
                      key={department.DepartmentId}
                    >

                      {/* DEPARTMENT */}

                      <td>

                        <div className="department-name">

                          <div className="department-row-icon">

                            <i className="bi bi-building"></i>

                          </div>

                          <strong>
                            {department.DepartmentName}
                          </strong>

                        </div>

                      </td>

                      {/* ID */}

                      <td>

                        <span className="department-id">
                          {department.DepartmentId}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td>

                        <span
                          className={`department-status ${
                            isActive
                              ? "active"
                              : "inactive"
                          }`}
                        >

                          <span className="department-status-dot"></span>

                          {isActive
                            ? "Active"
                            : "Inactive"}

                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td>

                        <div className="department-actions">

                          <button
                            type="button"
                            className="department-action-btn edit"
                            title="Edit Department"
                            onClick={() =>
                              handleEdit(department)
                            }
                          >

                            <i className="bi bi-pencil"></i>

                          </button>

                          <button
                            type="button"
                            className="department-action-btn delete"
                            title="Delete Department"
                            onClick={() =>
                              handleDeleteClick(department)
                            }
                          >

                            <i className="bi bi-trash3"></i>

                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          EDIT DEPARTMENT MODAL
      ===================================================== */}

      {showEditModal && (

        <div
          className="department-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCancelEdit();
            }
          }}
        >

          <div className="department-modal">

            <div className="department-modal-header">

              <div className="department-modal-icon edit-modal-icon">
                <i className="bi bi-pencil-square"></i>
              </div>

              <div>

                <h2>Edit Department</h2>

                <p>
                  Update the department information.
                </p>

              </div>

              <button
                type="button"
                className="department-modal-close"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>

            <form
              className="department-modal-form"
              onSubmit={handleUpdateDepartment}
            >

              <div className="department-modal-form-group">

                <label htmlFor="editDepartmentName">
                  Department Name
                  <span>*</span>
                </label>

                <div className="department-input-wrapper">

                  <i className="bi bi-building"></i>

                  <input
                    id="editDepartmentName"
                    type="text"
                    value={editingDepartmentName}
                    onChange={(e) =>
                      setEditingDepartmentName(
                        e.target.value
                      )
                    }
                    autoFocus
                    disabled={saving}
                  />

                </div>

              </div>

              <div className="department-modal-actions">

                <button
                  type="button"
                  className="department-modal-cancel"
                  onClick={handleCancelEdit}
                  disabled={saving}
                >
                  <i className="bi bi-x-lg"></i>
                  Cancel
                </button>

                <button
                  type="submit"
                  className="department-modal-save"
                  disabled={saving}
                >

                  <i
                    className={
                      saving
                        ? "bi bi-arrow-repeat department-spin-icon"
                        : "bi bi-check-lg"
                    }
                  ></i>

                  {saving ? "Saving..." : "Save Changes"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {showDeleteModal && (

        <div
          className="department-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCancelDelete();
            }
          }}
        >

          <div className="department-modal delete-modal">

            <div className="department-delete-icon">

              <i className="bi bi-trash3"></i>

            </div>

            <h2>Delete Department?</h2>

            <p className="department-delete-message">

              Are you sure you want to delete

              <strong>
                {" "}
                {deletingDepartmentName}
              </strong>
              ?

              <br />

              This action cannot be undone.

            </p>

            <div className="department-modal-actions">

              <button
                type="button"
                className="department-modal-cancel"
                onClick={handleCancelDelete}
                disabled={deleting}
              >
                <i className="bi bi-x-lg"></i>
                Cancel
              </button>

              <button
                type="button"
                className="department-modal-delete"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >

                <i
                  className={
                    deleting
                      ? "bi bi-arrow-repeat department-spin-icon"
                      : "bi bi-trash3"
                  }
                ></i>

                {deleting ? "Deleting..." : "Delete"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Department;