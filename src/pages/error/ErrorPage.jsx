import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {

    const navigate = useNavigate();

    const handleGoBack = () => {

        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/dashboard");
        }
    };

    const handleDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="error-page">

            {/* Animated Background Orbs */}

            <div className="error-orb error-orb-one"></div>
            <div className="error-orb error-orb-two"></div>
            <div className="error-orb error-orb-three"></div>


            {/* Floating Particles */}

            <div className="error-particle particle-one"></div>
            <div className="error-particle particle-two"></div>
            <div className="error-particle particle-three"></div>
            <div className="error-particle particle-four"></div>


            {/* Main Card */}

            <div className="error-content">

                {/* 404 */}

                <div className="error-number-wrapper">

                    <div className="error-number">
                        404
                    </div>

                    <div className="error-glow"></div>

                </div>


                {/* Icon */}

                <div className="error-icon">
                    <i className="bi bi-search"></i>
                </div>


                {/* Heading */}

                <h1>
                    Page Not Found
                </h1>


                {/* Description */}

                <p className="error-description">
                    Sorry, we couldn't find the page you're looking for.
                    The page may have been moved, removed, or the URL may be incorrect.
                </p>


                {/* Buttons */}

                <div className="error-actions">

                    <button
                        type="button"
                        className="error-back-button"
                        onClick={handleGoBack}
                    >
                        <i className="bi bi-arrow-left"></i>
                        Go Back
                    </button>


                    <button
                        type="button"
                        className="error-dashboard-button"
                        onClick={handleDashboard}
                    >
                        <i className="bi bi-grid-1x2-fill"></i>
                        Dashboard
                    </button>

                </div>


                {/* Footer */}

                <div className="error-footer">

                    <i className="bi bi-shield-check"></i>

                    <span>
                        Employee Management System
                    </span>

                </div>

            </div>

        </div>
    );
}

export default ErrorPage;