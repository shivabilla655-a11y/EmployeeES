import React, { useState } from "react";
import "./users.css";


const Users = () => {
  const [search, setSearch] = useState("");

  // Temporary sample data
  // We will replace this with DB/API data in the next step
  const [users] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      name: "Priya Reddy",
      email: "priya@example.com",
      role: "User",
      status: "Inactive",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-page">

      {/* PAGE HEADER */}
      <div className="users-page-header">
        <div>
          <h2>Users</h2>
          <p>Manage system users and their access</p>
        </div>

        <button className="user-add-btn">
          <i className="bi bi-plus-lg"></i>
          Add User
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="user-stats">

        <div className="user-stat-card">
          <div className="user-stat-icon">
            <i className="bi bi-people-fill"></i>
          </div>

          <div>
            <span>Total Users</span>
            <h3>{users.length}</h3>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon active">
            <i className="bi bi-person-check-fill"></i>
          </div>

          <div>
            <span>Active Users</span>
            <h3>
              {users.filter((user) => user.status === "Active").length}
            </h3>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon inactive">
            <i className="bi bi-person-x-fill"></i>
          </div>

          <div>
            <span>Inactive Users</span>
            <h3>
              {users.filter((user) => user.status === "Inactive").length}
            </h3>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon role">
            <i className="bi bi-shield-lock-fill"></i>
          </div>

          <div>
            <span>Admins</span>
            <h3>
              {users.filter((user) => user.role === "Admin").length}
            </h3>
          </div>
        </div>

      </div>

      {/* USER TABLE CARD */}
      <div className="users-table-card">

        {/* TABLE HEADER */}
        <div className="users-table-header">

          <div>
            <h3>All Users</h3>
            <p>View and manage registered users</p>
          </div>

          <div className="users-search">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                className="users-search-clear"
                onClick={() => setSearch("")}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

        </div>

        {/* TABLE */}
        <div className="users-table-wrapper">

          <table className="users-table">

            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id}>

                    <td className="user-number">
                      {index + 1}
                    </td>

                    <td>
                      <div className="user-info">

                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{user.name}</strong>
                          <span>User ID: {user.id}</span>
                        </div>

                      </div>
                    </td>

                    <td className="user-email">
                      {user.email}
                    </td>

                    <td>
                      <span
                        className={`user-role ${
                          user.role.toLowerCase()
                        }`}
                      >
                        <i
                          className={
                            user.role === "Admin"
                              ? "bi bi-shield-fill-check"
                              : "bi bi-person-fill"
                          }
                        ></i>

                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`user-status ${
                          user.status.toLowerCase()
                        }`}
                      >
                        <span className="status-dot"></span>
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <div className="user-actions">

                        <button
                          className="user-action-btn edit"
                          title="Edit User"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="user-action-btn delete"
                          title="Delete User"
                        >
                          <i className="bi bi-trash3"></i>
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <div className="users-empty">
                      <i className="bi bi-person-x"></i>
                      <h4>No users found</h4>
                      <p>Try changing your search.</p>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* TABLE FOOTER */}
        <div className="users-table-footer">
          <span>
            Showing <strong>{filteredUsers.length}</strong> of{" "}
            <strong>{users.length}</strong> users
          </span>

          <div className="users-pagination">
            <button disabled>
              <i className="bi bi-chevron-left"></i>
            </button>

            <button className="active">1</button>

            <button disabled>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Users;