import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthenticationContext } from "../services/AuthContext";

export default function WelcomePageText({ action }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useContext(
    AuthenticationContext
  );
  const handleGuestClick = async (e) => {
    e.preventDefault();

    const guestFormData = {
      firstName: "",
      lastName: "",
      email: "john.smith@gmail.com",
      password: "password12345",
      confirmPassword: "",
    };

    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guestFormData),
    };

    try {
      const res = await fetch("/api/auth/login", params);

      if (res.ok) {
        const { token, userName, userEmail, userId, profilePictureID } =
          await res.json();
        const userDetails = {
          name: userName,
          email: userEmail,
          profilePictureID: profilePictureID,
          id: userId,
        };
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userDetails));
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
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
              New to Umbrella Talk?
              <span className="welcome-page-action-link">
                <Link to="/register"> Register</Link>
              </span>
              <p>
                Continue as a Guest -
                <span className="welcome-page-action-link">
                  <Link onClick={handleGuestClick}> Login</Link>
                </span>
              </p>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="welcome-page-action-link">
                <Link to="/login">Login</Link>
              </span>
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
