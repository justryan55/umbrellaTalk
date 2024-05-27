import { Link } from "react-router-dom";

export default function LoginRegisterButton({type}) {
  return (
    <div>
        <button
            type = {type}
            className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
                {type === "login" ? <Link to="/login">Login</Link> : type === "register" ? <Link to="/register">Register</Link> : <Link to="/">Back</Link>}
        </button>
    </div>
  )
}
