import PropTypes from "prop-types"

export default function LoginRegisterButton({ action }) {
  return (
    <div className="btn-container">
        <button action = {action} className="btn">
          {action === "login" ? "Login" : "Register" }
        </button>
    </div>
  )
}

LoginRegisterButton.propTypes = {
  action: PropTypes.string.isRequired
}