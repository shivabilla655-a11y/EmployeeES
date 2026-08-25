import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {
  getAllPositions,
  addPosition,
  updatePosition,
  deletePosition,
} from "../../services/position.Service.js";

import "./Position.css";

function Position() {
  // =========================================================
  // STATE
  // =========================================================

  const [positions, setPositions] = useState([]);

  const [positionName, setPositionName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Edit popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);

  // Delete popup
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePositionData, setDeletePositionData] = useState(null);
  const [isSave, setisSave] = useState(false);
  // =========================================================
  // FETCH POSITIONS
  // =========================================================

  const fetchPositions = async () => {
    try {
      setLoading(true);

      const response = await getAllPositions();

      setPositions(response?.data?.data || response?.data || []);
    } catch (error) {
      console.error("Error fetching positions:", error);

      toast.error(
        error?.response?.data?.message || "Failed to fetch positions.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // PAGE LOAD
  // =========================================================

  useEffect(() => {
    fetchPositions();
  }, []);

  // =========================================================
  // ADD POSITION
  // =========================================================

  const handleAddPosition = async (e) => {
    e.preventDefault();

    const trimmedName = positionName.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      toast.error("Position name is required.");
      return;
    }

    try {
      setSaving(true);

      await addPosition(trimmedName, trimmedDescription);

      toast.success("Position added successfully.");

      setPositionName("");
      setDescription("");

      await fetchPositions();
    } catch (error) {
      console.error("Add position error:", error);

      toast.error(error?.response?.data?.message || "Failed to add position.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // OPEN EDIT POPUP
  // =========================================================

  const handleEdit = (position) => {
    try {
      setEditingPosition(position);

      setPositionName(position.PositionName || "");

      setDescription(position.Description || "");

      setShowEditPopup(true);
    } catch (error) {
      console.error("Open edit popup error:", error);

      toast.error("Unable to open edit position.");
    }
  };

  // =========================================================
  // CLOSE EDIT POPUP
  // =========================================================

  const handleCancelEdit = () => {
    try {
      setShowEditPopup(false);

      setEditingPosition(null);

      setPositionName("");
      setDescription("");
    } catch (error) {
      console.error("Cancel edit error:", error);
    }
  };

  // =========================================================
  // UPDATE POSITION
  // =========================================================

  const handleUpdatePosition = async (e) => {
    e.preventDefault();

    const trimmedName = positionName.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      toast.error("Position name is required.");
      return;
    }

    if (!editingPosition) {
      toast.error("Position information not found.");
      return;
    }

    try {
      setSaving(true);

      await updatePosition(
        editingPosition.PositionId,
        trimmedName,
        trimmedDescription,
      );

      toast.success("Position updated successfully.");

      setShowEditPopup(false);

      setEditingPosition(null);

      setPositionName("");
      setDescription("");

      await fetchPositions();
    } catch (error) {
      console.error("Update position error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update position.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // OPEN DELETE POPUP
  // =========================================================

  const handleDeleteClick = (position) => {
    try {
      setDeletePositionData(position);

      setShowDeletePopup(true);
    } catch (error) {
      console.error("Open delete popup error:", error);

      toast.error("Unable to open delete confirmation.");
    }
  };

  // =========================================================
  // CANCEL DELETE
  // =========================================================

  const handleCancelDelete = () => {
    try {
      setShowDeletePopup(false);

      setDeletePositionData(null);
    } catch (error) {
      console.error("Cancel delete error:", error);
    }
  };

  // =========================================================
  // CONFIRM DELETE
  // =========================================================

  const handleConfirmDelete = async () => {
    if (!deletePositionData) {
      toast.error("Position information not found.");

      return;
    }

    try {
      setDeleting(true);

      await deletePosition(deletePositionData.PositionId);

      toast.success("Position deleted successfully.");

      setShowDeletePopup(false);

      setDeletePositionData(null);

      await fetchPositions();
    } catch (error) {
      console.error("Delete position error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete position.",
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================================================
  // TOTAL POSITIONS
  // =========================================================

  const totalPositions = positions.length;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="position-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="position-page-header">
        <div className="position-header-left">
          <div className="position-title-icon">
            <i className="bi bi-briefcase"></i>
          </div>

          <div>
            <h1>Positions</h1>

            <p>Manage and organize your company positions.</p>
          </div>
        </div>

        <div className="position-total">
          Total Positions
          <strong>{totalPositions}</strong>
        </div>
      </div>

      {/* =====================================================
          ADD POSITION SECTION
      ===================================================== */}

      <div className="position-add-section">
        {/* <div className="position-add-icon">
          <i className="bi bi-plus-lg"></i>
        </div> */}

        <h2>Add Position</h2>

        <p>Create a new position for your organization.</p>

        <form className="position-form" onSubmit={handleAddPosition}>
          {/* POSITION NAME */}

          <div className="position-form-group">
            <label htmlFor="positionName">
              Position Name
              <span>*</span>
            </label>

            <div className="position-input-wrapper">
              <i className="bi bi-briefcase"></i>

              <input
                id="positionName"
                type="text"
                placeholder="Enter position name"
                value={positionName}
                onChange={(e) => setPositionName(e.target.value)}
                disabled={saving}
              />
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="position-form-group">
            <label htmlFor="description">Description</label>

            <div className="position-input-wrapper">
              <i className="bi bi-card-text"></i>

              <input
                id="description"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={saving}
              />
            </div>
          </div>

          {/* ADD BUTTON */}

          <button type="submit" className="position-add-btn" disabled={saving || !positionName.trim()}>
            <i className={saving ? "bi bi-arrow-repeat" : "bi bi-plus-lg"}></i>

            {saving ? "Saving..." : "Add Position"}
          </button>
        </form>
      </div>

      {/* =====================================================
          POSITION DIRECTORY
      ===================================================== */}

      <div className="position-directory-card">
        {/* DIRECTORY HEADER */}

        <div className="position-directory-header">
          <div className="position-directory-title">
            <h2>Position Directory</h2>

            <p>View and manage all organization positions.</p>
          </div>

          <div className="position-directory-count">
            <i className="bi bi-briefcase"></i>

            <span>{totalPositions}</span>
          </div>
        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="position-table-wrapper">
          <table className="position-table">
            <thead>
              <tr>
                <th>POSITION</th>

                <th>DESCRIPTION</th>

                <th>STATUS</th>

                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {/* LOADING */}

              {loading ? (
                <tr>
                  <td colSpan="5" className="position-loading">
                    <i className="bi bi-arrow-repeat"></i>
                    Loading positions...
                  </td>
                </tr>
              ) : positions.length === 0 ? (
                /* EMPTY */

                <tr>
                  <td colSpan="5" className="position-empty">
                    <i className="bi bi-briefcase"></i>

                    <span>No positions found.</span>
                  </td>
                </tr>
              ) : (
                /* DATA */

                positions.map((position) => (
                  <tr key={position.PositionId}>
                    {/* POSITION */}

                    <td>
                      <div className="position-name">
                        <div className="position-row-icon">
                          <i className="bi bi-briefcase"></i>
                        </div>

                        <strong>{position.PositionName}</strong>
                      </div>
                    </td>

                    {/* DESCRIPTION */}

                    <td>
                      <span className="position-description">
                        {position.Description || "No description"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          position.IsActive === false
                            ? "position-status inactive"
                            : "position-status"
                        }
                      >
                        <span className="position-status-dot"></span>

                        {position.IsActive === false ? "Inactive" : "Active"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="position-actions">
                        {/* EDIT */}

                        <button
                          type="button"
                          className="position-action-btn edit"
                          title="Edit Position"
                          onClick={() => handleEdit(position)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          className="position-action-btn delete"
                          title="Delete Position"
                          onClick={() => handleDeleteClick(position)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =====================================================
          EDIT POPUP
      ===================================================== */}

      {showEditPopup && (
        <div className="position-modal-overlay">
          <div className="position-modal">
            {/* MODAL HEADER */}

            <div className="position-modal-header">
              <div className="position-modal-title">
                <div className="position-modal-icon">
                  <i className="bi bi-pencil-square"></i>
                </div>

                <div>
                  <h2>Edit Position</h2>

                  <p>Update the position information.</p>
                </div>
              </div>

              <button
                type="button"
                className="position-modal-close"
                onClick={handleCancelEdit}
                disabled={saving}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* MODAL FORM */}

            <form
              className="position-modal-form"
              onSubmit={handleUpdatePosition}
            >
              {/* NAME */}

              <div className="position-form-group">
                <label>
                  Position Name
                  <span>*</span>
                </label>

                <div className="position-input-wrapper">
                  <i className="bi bi-briefcase"></i>

                  <input
                    type="text"
                    value={positionName}
                    onChange={(e) => setPositionName(e.target.value)}
                    disabled={saving}
                    autoFocus
                  />
                </div>
              </div>

              {/* DESCRIPTION */}

              <div className="position-form-group">
                <label>Description</label>

                <div className="position-input-wrapper">
                  <i className="bi bi-card-text"></i>

                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={saving}
                  />
                </div>
              </div>

              {/* BUTTONS */}

              <div className="position-modal-buttons">
                <button
                  type="button"
                  className="position-cancel-btn"
                  onClick={handleCancelEdit}
                  disabled={saving}
                >
                  <i className="bi bi-x-lg"></i>
                  Cancel
                </button>

                <button
                  type="submit"
                  className="position-save-btn"
                  disabled={saving}
                >
                  <i
                    className={saving ? "bi bi-arrow-repeat" : "bi bi-check-lg"}
                  ></i>

                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION POPUP
      ===================================================== */}

      {showDeletePopup && (
        <div className="position-modal-overlay">
          <div className="position-delete-modal">
            <div className="position-delete-icon">
              <i className="bi bi-trash3"></i>
            </div>

            <h2>Delete Position?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>{deletePositionData?.PositionName}</strong>
              ?
              <br />
              This action cannot be undone.
            </p>

            <div className="position-modal-buttons">
              <button
                type="button"
                className="position-cancel-btn"
                onClick={handleCancelDelete}
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="position-delete-confirm-btn"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                <i
                  className={deleting ? "bi bi-arrow-repeat" : "bi bi-trash3"}
                ></i>

                {deleting ? "Deleting..." : "Delete Position"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Position;
