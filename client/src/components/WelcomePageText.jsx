import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

export default function WelcomePageText({ action }) {
  const navigate = useNavigate();

  const handleGuestClick = async (e) => {
    e.preventDefault();

    const guestFormData = {
      firstName: "",
      lastName: "",
      email: "john.smith@gmail.com",
      password: "password12345",
      confirmPassword: "",
    };

    const res = await fetch(
      `api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guestFormData),
      },
      guestFormData
    );
    const data = await res?.json();
    window.localStorage.setItem("token", data.token);
    navigate("/home");
  };

  return (
    <div className="welcome-page-header-container">
      <div className="welcome-page-header-content">
        <img
          className="welcome-page-header-logo"
          src="./logo.svg"
          alt="Umbrella Talk"
        />
        <h2 className="welcome-page-main-header">
          {action === "welcome"
            ? "Welcome to Umbrella Talk"
            : action === "login"
            ? "Login to your account"
            : "Register for an account"}
        </h2>
        <p className="welcome-page-description">
          {action === "welcome"
            ? "Step into Umbrella Talk, your sanctuary for uninterrupted conversation."
            : action === "login"
            ? "Login to Umbrella Talk, your sanctuary for uninterrupted conversation."
            : "Register to Umbrella Talk, your sanctuary for uninterrupted conversation."}
        </p>
        <p className="welcome-page-action-description">
          {action === "welcome" ? (
            ""
          ) : action === "login" ? (
            <>
              New to Umbrella Talk?{" "}
              <span className="welcome-page-action-link">
                <Link to="/register">Register</Link>
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="welcome-page-action-link">
                <Link to="/login">Login</Link>
              </span>
              <p>
                Continue as a Guest -
                <span className="welcome-page-action-link">
                  <Link onClick={handleGuestClick}> Login</Link>
                </span>
              </p>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

WelcomePageText.propTypes = {
  action: PropTypes.string.isRequired,
};
