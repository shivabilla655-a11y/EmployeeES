import { useForm } from "react-hook-form";
import { Link , useNavigate} from "react-router-dom";
import authService from "../../services/auth.service";
import "./Register.css";


function Register() {
const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm();

    const password = watch("password");

  const onSubmit = async (data) => {
    try {
        const response = await authService.register({
            fullName: data.name,
            email: data.email,
            password: data.password,
        });

        console.log("Registration successful:", response);
        navigate("/dashboard"); // Redirect to the dashboard after successful registration

    } catch (error) {
        console.error("Registration failed:", error);

        console.error(
            error.response?.data?.message ||
            "Registration failed"
        );
    }
};

    return (
        <div className="register-page">

            {/* Background decorations */}
            <div className="register-orb register-orb-one"></div>
            <div className="register-orb register-orb-two"></div>

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">

                        <div className="register-glass-card">

                            {/* Logo / Brand */}
                            <div className="text-center mb-2">

                                <div className="brand-icon mx-auto mb-1">
                                    <i className="bi bi-people-fill"></i>
                                </div>

                                <h2 className="register-title">
                                    Create Account
                                </h2>

                                <p className="register-subtitle">
                                    Join the Employee Management System
                                </p>

                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* Name */}
                                <div className="mb-3">

                                    <label className="form-label custom-label">
                                        Full Name
                                    </label>

                                    <div className="input-group custom-input-group">

                                        <span className="input-group-text">
                                            <i className="bi bi-person"></i>
                                        </span>

                                        <input
                                            type="text"
                                            className={`form-control ${
                                                errors.name ? "is-invalid" : ""
                                            }`}
                                            placeholder="Enter your full name"
                                            {...register("name", {
                                                required: "Full name is required",
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "Name must be at least 3 characters"
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message:
                                                        "Name cannot exceed 100 characters"
                                                }
                                            })}
                                        />

                                    </div>

                                    {errors.name && (
                                        <div className="validation-message">
                                            <i className="bi bi-exclamation-circle me-1"></i>
                                            {errors.name.message}
                                        </div>
                                    )}

                                </div>

                                {/* Email */}
                                <div className="mb-3">

                                    <label className="form-label custom-label">
                                        Email Address
                                    </label>

                                    <div className="input-group custom-input-group">

                                        <span className="input-group-text">
                                            <i className="bi bi-envelope"></i>
                                        </span>

                                        <input
                                            type="email"
                                            className={`form-control ${
                                                errors.email ? "is-invalid" : ""
                                            }`}
                                            placeholder="Enter your email"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message:
                                                        "Please enter a valid email address"
                                                }
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

                                    <label className="form-label custom-label">
                                        Password
                                    </label>

                                    <div className="input-group custom-input-group">

                                        <span className="input-group-text">
                                            <i className="bi bi-lock"></i>
                                        </span>

                                        <input
                                            type="password"
                                            className={`form-control ${
                                                errors.password ? "is-invalid" : ""
                                            }`}
                                            placeholder="Create a password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        "Password must be at least 6 characters"
                                                }
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

                                {/* Confirm Password */}
                                <div className="mb-4">

                                    <label className="form-label custom-label">
                                        Confirm Password
                                    </label>

                                    <div className="input-group custom-input-group">

                                        <span className="input-group-text">
                                            <i className="bi bi-shield-lock"></i>
                                        </span>

                                        <input
                                            type="password"
                                            className={`form-control ${
                                                errors.confirmPassword
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            placeholder="Confirm your password"
                                            {...register("confirmPassword", {
                                                required:
                                                    "Please confirm your password",
                                                validate: (value) =>
                                                    value === password ||
                                                    "Passwords do not match"
                                            })}
                                        />

                                    </div>

                                    {errors.confirmPassword && (
                                        <div className="validation-message">
                                            <i className="bi bi-exclamation-circle me-1"></i>
                                            {errors.confirmPassword.message}
                                        </div>
                                    )}

                                </div>

                                {/* Terms */}
                                <div className="form-check mb-4">

                                    <input
                                        className={`form-check-input ${
                                            errors.terms ? "is-invalid" : ""
                                        }`}
                                        type="checkbox"
                                        id="terms"
                                        {...register("terms", {
                                            required:
                                                "You must accept the terms and conditions"
                                        })}
                                    />

                                    <label
                                        className="form-check-label terms-label"
                                        htmlFor="terms"
                                    >
                                        I agree to the{" "}
                                        <span>Terms & Conditions</span>
                                    </label>

                                </div>

                                {errors.terms && (
                                    <div className="validation-message mb-3">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {errors.terms.message}
                                    </div>
                                )}

                                {/* Register Button */}
                                <button
                                    type="submit"
                                    className="btn register-button w-100"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                            ></span>
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </>
                                    )}
                                </button>

                            </form>

                            {/* Login */}
                            <div className="text-center login-section">

                                <span>
                                    Already have an account?
                                </span>

                                <Link
                                    to="/login"
                                    className="login-link ms-2"
                                >
                                    Sign In
                                </Link>

                            </div>

                        </div>

                        <div className="text-center security-text">
                            <i className="bi bi-shield-check me-1"></i>
                            Your information is securely protected
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;