import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import authService from "../../services/auth.service";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      console.log("Login successful:", response);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);

      console.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      {/* Background decorations */}
      <div className="login-orb login-orb-one"></div>
      <div className="login-orb login-orb-two"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="login-glass-card">
              {/* Brand */}
              <div className="text-center mb-1">
                <div className="brand-icon mx-auto mb-3">
                  <i className="bi bi-people-fill"></i>
                </div>

                <h2 className="login-title">Welcome Back</h2>

                <p className="login-subtitle">
                  Sign in to Employee Management System
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label custom-label">
                    Email Address
                  </label>

                  <div className="input-group custom-input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>

                    <input
                      id="email"
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your email"
                      autoComplete="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                  </div>

                  {errors.email && (
                    <div className="validation-message">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label custom-label">
                    Password
                  </label>

                  <div className="input-group custom-input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>

                    <input
                      id="password"
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                  </div>

                  {errors.password && (
                    <div className="validation-message">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Remember / Forgot */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      {...register("rememberMe")}
                    />

                    <label
                      className="form-check-label remember-label"
                      htmlFor="rememberMe"
                    >
                      Remember me
                    </label>
                  </div>

                  <a
                    href="#"
                    className="forgot-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn login-button w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <i className="bi bi-arrow-right ms-2"></i>
                    </>
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="text-center register-section">
                <span>Don't have an account?</span>

                <Link to="/register" className="register-link ms-2">
                  Create Account
                </Link>
              </div>
            </div>

            {/* Security */}
            <div className="text-center security-text">
              <i className="bi bi-shield-check me-1"></i>
              Secure authentication protected by JWT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
