import React, { useRef, useState } from "react";
import "./Settings.css";

const Settings = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [activeSection, setActiveSection] = useState("general");

  const [language, setLanguage] = useState("English");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const [twoFactor, setTwoFactor] = useState(false);

  // =========================================================
  // REFS
  // =========================================================

  const contentRef = useRef(null);

  const generalRef = useRef(null);
  const notificationsRef = useRef(null);
  const securityRef = useRef(null);
  const accountRef = useRef(null);

  // =========================================================
  // SECTION REFS
  // =========================================================

  const sectionRefs = {
    general: generalRef,
    notifications: notificationsRef,
    security: securityRef,
    account: accountRef,
  };

  // =========================================================
  // SCROLL TO SECTION
  // =========================================================

  const handleSectionClick = (section) => {
    setActiveSection(section);

    const container = contentRef.current;
    const target = sectionRefs[section]?.current;

    if (!container || !target) {
      return;
    }

    container.scrollTo({
      top: target.offsetTop - 5,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SAVE SETTINGS
  // =========================================================

  const handleSave = () => {
    const settingsData = {
      language,
      dateFormat,
      pushNotifications,
      emailNotifications,
      loginAlerts,
      twoFactor,
    };

    console.log("Settings Saved:", settingsData);

    // Later you can connect your API here.
  };

  // =========================================================
  // CHANGE PASSWORD
  // =========================================================

  const handleChangePassword = () => {
    console.log("Change password clicked");

    // Later connect your change-password popup/API here.
  };

  // =========================================================
  // LOGOUT ALL DEVICES
  // =========================================================

  const handleLogoutAll = () => {
    console.log("Logout from all devices");

    // Later connect your logout-all API here.
  };

  return (
    <div className="settings-page">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="settings-page-header">

        <div>
          <h2>Settings</h2>

          <p>
            Manage your application and account preferences
          </p>
        </div>

        <button
          type="button"
          className="settings-save-btn"
          onClick={handleSave}
        >
          <i className="bi bi-check-lg"></i>

          Save Changes
        </button>

      </div>


      {/* =====================================================
          SETTINGS LAYOUT
      ====================================================== */}

      <div className="settings-layout">


        {/* ===================================================
            LEFT SETTINGS MENU
        ==================================================== */}

        <div className="settings-sidebar">

          <div className="settings-sidebar-title">
            SETTINGS
          </div>


          {/* GENERAL */}

          <button
            type="button"
            className={`settings-menu ${
              activeSection === "general"
                ? "active"
                : ""
            }`}
            onClick={() => handleSectionClick("general")}
          >
            <i className="bi bi-sliders"></i>

            <span>General</span>
          </button>


          {/* NOTIFICATIONS */}

          <button
            type="button"
            className={`settings-menu ${
              activeSection === "notifications"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleSectionClick("notifications")
            }
          >
            <i className="bi bi-bell"></i>

            <span>Notifications</span>
          </button>


          {/* SECURITY */}

          <button
            type="button"
            className={`settings-menu ${
              activeSection === "security"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleSectionClick("security")
            }
          >
            <i className="bi bi-shield-lock"></i>

            <span>Security</span>
          </button>


          {/* ACCOUNT */}

          <button
            type="button"
            className={`settings-menu ${
              activeSection === "account"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleSectionClick("account")
            }
          >
            <i className="bi bi-person-circle"></i>

            <span>Account</span>
          </button>

        </div>


        {/* ===================================================
            RIGHT SCROLLABLE CONTENT
        ==================================================== */}

        <div
          className="settings-content"
          ref={contentRef}
        >


          {/* =================================================
              GENERAL SETTINGS
          ================================================== */}

          <section
            className="settings-card"
            ref={generalRef}
          >

            {/* CARD HEADER */}

            <div className="settings-card-header">

              <div className="settings-card-icon">
                <i className="bi bi-sliders"></i>
              </div>

              <div>
                <h3>General Settings</h3>

                <p>
                  Configure your basic application preferences
                </p>
              </div>

            </div>


            {/* GENERAL FORM */}

            <div className="settings-form">


              {/* LANGUAGE */}

              <div className="settings-field">

                <label htmlFor="language">
                  Language
                </label>

                <select
                  id="language"
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                >
                  <option value="English">
                    English
                  </option>

                  <option value="Telugu">
                    Telugu
                  </option>

                  <option value="Hindi">
                    Hindi
                  </option>
                </select>

                <span>
                  Select your preferred application language.
                </span>

              </div>


              {/* DATE FORMAT */}

              <div className="settings-field">

                <label htmlFor="dateFormat">
                  Date Format
                </label>

                <select
                  id="dateFormat"
                  value={dateFormat}
                  onChange={(e) =>
                    setDateFormat(e.target.value)
                  }
                >
                  <option value="DD/MM/YYYY">
                    DD/MM/YYYY
                  </option>

                  <option value="MM/DD/YYYY">
                    MM/DD/YYYY
                  </option>

                  <option value="YYYY-MM-DD">
                    YYYY-MM-DD
                  </option>
                </select>

                <span>
                  Choose how dates should be displayed.
                </span>

              </div>

            </div>

          </section>


          {/* =================================================
              NOTIFICATIONS
          ================================================== */}

          <section
            className="settings-card"
            ref={notificationsRef}
          >

            {/* HEADER */}

            <div className="settings-card-header">

              <div className="settings-card-icon notification">
                <i className="bi bi-bell"></i>
              </div>

              <div>
                <h3>Notifications</h3>

                <p>
                  Control how you receive notifications
                </p>
              </div>

            </div>


            {/* OPTIONS */}

            <div className="settings-options">


              {/* PUSH NOTIFICATIONS */}

              <div className="settings-option">

                <div className="settings-option-info">

                  <div className="settings-option-icon">
                    <i className="bi bi-bell"></i>
                  </div>

                  <div>

                    <strong>
                      Push Notifications
                    </strong>

                    <span>
                      Receive notifications inside the
                      application
                    </span>

                  </div>

                </div>


                <label className="settings-switch">

                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) =>
                      setPushNotifications(
                        e.target.checked
                      )
                    }
                  />

                  <span></span>

                </label>

              </div>


              {/* EMAIL NOTIFICATIONS */}

              <div className="settings-option">

                <div className="settings-option-info">

                  <div className="settings-option-icon">
                    <i className="bi bi-envelope"></i>
                  </div>

                  <div>

                    <strong>
                      Email Notifications
                    </strong>

                    <span>
                      Receive important updates through email
                    </span>

                  </div>

                </div>


                <label className="settings-switch">

                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) =>
                      setEmailNotifications(
                        e.target.checked
                      )
                    }
                  />

                  <span></span>

                </label>

              </div>


              {/* LOGIN ALERTS */}

              <div className="settings-option">

                <div className="settings-option-info">

                  <div className="settings-option-icon">
                    <i className="bi bi-shield-exclamation"></i>
                  </div>

                  <div>

                    <strong>
                      Login Alerts
                    </strong>

                    <span>
                      Get notified when your account is
                      accessed
                    </span>

                  </div>

                </div>


                <label className="settings-switch">

                  <input
                    type="checkbox"
                    checked={loginAlerts}
                    onChange={(e) =>
                      setLoginAlerts(
                        e.target.checked
                      )
                    }
                  />

                  <span></span>

                </label>

              </div>

            </div>

          </section>


          {/* =================================================
              SECURITY
          ================================================== */}

          <section
            className="settings-card"
            ref={securityRef}
          >

            {/* HEADER */}

            <div className="settings-card-header">

              <div className="settings-card-icon security">
                <i className="bi bi-shield-lock"></i>
              </div>

              <div>
                <h3>Security</h3>

                <p>
                  Manage your account security preferences
                </p>
              </div>

            </div>


            {/* SECURITY OPTIONS */}

            <div className="settings-options">


              {/* CHANGE PASSWORD */}

              <div className="settings-option">

                <div className="settings-option-info">

                  <div className="settings-option-icon">
                    <i className="bi bi-key"></i>
                  </div>

                  <div>

                    <strong>
                      Change Password
                    </strong>

                    <span>
                      Update your account password
                    </span>

                  </div>

                </div>


                <button
                  type="button"
                  className="settings-action-btn"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>

              </div>


              {/* TWO FACTOR AUTHENTICATION */}

              <div className="settings-option">

                <div className="settings-option-info">

                  <div className="settings-option-icon">
                    <i className="bi bi-phone"></i>
                  </div>

                  <div>

                    <strong>
                      Two-Factor Authentication
                    </strong>

                    <span>
                      Add an additional layer of security
                    </span>

                  </div>

                </div>


                <label className="settings-switch">

                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(e) =>
                      setTwoFactor(
                        e.target.checked
                      )
                    }
                  />

                  <span></span>

                </label>

              </div>

            </div>

          </section>


          {/* =================================================
              ACCOUNT
          ================================================== */}

          <section
            className="settings-card"
            ref={accountRef}
          >

            {/* HEADER */}

            <div className="settings-card-header">

              <div className="settings-card-icon account">
                <i className="bi bi-person-circle"></i>
              </div>

              <div>

                <h3>Account</h3>

                <p>
                  Manage your account information
                </p>

              </div>

            </div>


            {/* ACCOUNT INFORMATION */}

            <div className="settings-account-info">


              {/* STATUS */}

              <div>

                <span>
                  Account Status
                </span>

                <strong className="settings-active">

                  <span></span>

                  Active

                </strong>

              </div>


              {/* ACCOUNT TYPE */}

              <div>

                <span>
                  Account Type
                </span>

                <strong>
                  Administrator
                </strong>

              </div>


              {/* LAST LOGIN */}

              <div>

                <span>
                  Last Login
                </span>

                <strong>
                  Today
                </strong>

              </div>

            </div>

          </section>


          {/* =================================================
              DANGER ZONE
          ================================================== */}

          <section className="settings-card danger-card">

            {/* HEADER */}

            <div className="settings-card-header">

              <div className="settings-card-icon danger">
                <i className="bi bi-exclamation-triangle"></i>
              </div>

              <div>

                <h3>
                  Danger Zone
                </h3>

                <p>
                  Irreversible account actions
                </p>

              </div>

            </div>


            {/* DANGER CONTENT */}

            <div className="settings-danger-content">

              <div>

                <strong>
                  Logout from all devices
                </strong>

                <span>
                  Sign out your account from all active
                  sessions.
                </span>

              </div>


              <button
                type="button"
                className="logout-all-btn"
                onClick={handleLogoutAll}
              >
                Logout All
              </button>

            </div>

          </section>


          {/* BOTTOM SPACE */}

          <div style={{ height: "20px", flexShrink: 0 }} />

        </div>

      </div>

    </div>
  );
};

export default Settings;