import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Poorna",
    lastName: "Chandar",
    email: "poorna@example.com",
    phone: "+91 9876543210",
    role: "Admin",
    department: "IT",
    position: "Software Engineer",
    employeeId: "EMP1005",
    joinedDate: "28 Oct 2024",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditing(false);

    // API integration will be added later
    console.log("Updated profile:", profile);
  };

  return (
    <div className="profile-page">

      {/* PAGE HEADER */}
      <div className="profile-page-header">
        <div>
          <h2>My Profile</h2>
          <p>View and manage your personal information</p>
        </div>

        {!editing ? (
          <button
            className="profile-edit-btn"
            onClick={() => setEditing(true)}
          >
            <i className="bi bi-pencil-square"></i>
            Edit Profile
          </button>
        ) : (
          <div className="profile-header-actions">
            <button
              className="profile-cancel-btn"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>

            <button
              className="profile-save-btn"
              onClick={handleSave}
            >
              <i className="bi bi-check-lg"></i>
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* PROFILE TOP CARD */}
      <div className="profile-main-card">

        <div className="profile-cover"></div>

        <div className="profile-main-content">

          <div className="profile-avatar-large">
            {profile.firstName.charAt(0)}
            {profile.lastName.charAt(0)}
          </div>

          <div className="profile-main-info">
            <h3>
              {profile.firstName} {profile.lastName}
            </h3>

            <p>{profile.position}</p>

            <span className="profile-active-status">
              <span></span>
              Active
            </span>
          </div>

          <div className="profile-role-badge">
            <i className="bi bi-shield-check"></i>
            {profile.role}
          </div>

        </div>

      </div>

      {/* PROFILE CONTENT */}
      <div className="profile-content-grid">

        {/* PERSONAL INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-header">
            <div className="profile-card-title">
              <div className="profile-card-icon">
                <i className="bi bi-person"></i>
              </div>

              <div>
                <h3>Personal Information</h3>
                <p>Your basic personal details</p>
              </div>
            </div>
          </div>

          <div className="profile-form-grid">

            <div className="profile-field">
              <label>First Name</label>

              {editing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.firstName}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Last Name</label>

              {editing ? (
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  {profile.lastName}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Email Address</label>

              <div className="profile-value profile-readonly">
                <i className="bi bi-envelope"></i>
                {profile.email}
              </div>
            </div>

            <div className="profile-field">
              <label>Phone Number</label>

              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="profile-value">
                  <i className="bi bi-telephone"></i>
                  {profile.phone}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* EMPLOYEE INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-header">
            <div className="profile-card-title">
              <div className="profile-card-icon employee">
                <i className="bi bi-briefcase"></i>
              </div>

              <div>
                <h3>Employee Information</h3>
                <p>Your organization details</p>
              </div>
            </div>
          </div>

          <div className="profile-form-grid">

            <div className="profile-field">
              <label>Employee ID</label>

              <div className="profile-value profile-readonly">
                <i className="bi bi-person-badge"></i>
                {profile.employeeId}
              </div>
            </div>

            <div className="profile-field">
              <label>Role</label>

              <div className="profile-value">
                <span className="profile-inline-role">
                  <i className="bi bi-shield-check"></i>
                  {profile.role}
                </span>
              </div>
            </div>

            <div className="profile-field">
              <label>Department</label>

              <div className="profile-value profile-readonly">
                <i className="bi bi-building"></i>
                {profile.department}
              </div>
            </div>

            <div className="profile-field">
              <label>Position</label>

              <div className="profile-value profile-readonly">
                <i className="bi bi-person-workspace"></i>
                {profile.position}
              </div>
            </div>

          </div>
        </div>

        {/* ACCOUNT INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-header">
            <div className="profile-card-title">
              <div className="profile-card-icon security">
                <i className="bi bi-shield-lock"></i>
              </div>

              <div>
                <h3>Account & Security</h3>
                <p>Manage your account security</p>
              </div>
            </div>
          </div>

          <div className="profile-security-list">

            <div className="profile-security-item">

              <div className="profile-security-left">
                <div className="security-icon">
                  <i className="bi bi-key"></i>
                </div>

                <div>
                  <strong>Password</strong>
                  <span>Last updated recently</span>
                </div>
              </div>

              <button className="change-password-btn">
                Change Password
              </button>

            </div>

            <div className="profile-security-item">

              <div className="profile-security-left">
                <div className="security-icon">
                  <i className="bi bi-shield-check"></i>
                </div>

                <div>
                  <strong>Account Status</strong>
                  <span>Your account is currently active</span>
                </div>
              </div>

              <span className="account-active">
                <span></span>
                Active
              </span>

            </div>

          </div>
        </div>

        {/* JOINING INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-header">
            <div className="profile-card-title">
              <div className="profile-card-icon joining">
                <i className="bi bi-calendar-check"></i>
              </div>

              <div>
                <h3>Employment Details</h3>
                <p>Employment timeline</p>
              </div>
            </div>
          </div>

          <div className="profile-joining-info">

            <div className="joining-item">
              <span>Joined Date</span>
              <strong>{profile.joinedDate}</strong>
            </div>

            <div className="joining-item">
              <span>Current Position</span>
              <strong>{profile.position}</strong>
            </div>

            <div className="joining-item">
              <span>Department</span>
              <strong>{profile.department}</strong>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Profile;