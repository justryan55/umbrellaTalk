import { Link } from "react-router-dom";

export default function WeclomePageHeader({type}) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-20 mt-20 pb-5 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="./logo.svg"
              alt="Umbrella Talk"
            />
            <h2 
              type = {type}
              className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
              >
                {type === "welcome" ? 'Welcome to Umbrella Talk' : type === "login" ? "Login to your account" : "Register for an account" }
            </h2>
            <p 
              type = {type}  
              className="mt-5 text-center"
              >
                {type === "welcome" ? "Step into Umbrella Talk, your sanctuary for uninterrupted conversation." : type === "login" ? "Login to Umbrella Talk, your sanctuary for uninterrupted conversation." : "Register to Umbrella Talk, your sanctuary for uninterrupted conversation."}
              </p>
              <p
                type = {type}
                className="mt-2 text-center text-sm text-gray-500"
              >
                {type === "welcome" ? '' : type === "login" ? <Link to="/register">New to Umbrella Talk? Register</Link> : <Link to="/login">Already have an account? Login</Link> }
              </p>
            </div>
        </div>
      </>
    )
  }
  
  
  