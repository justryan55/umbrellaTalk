import { Link } from "react-router-dom";

export default function WeclomePageHeader({action}) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-20 mt-20 pb-5 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="./logo.svg"
              alt="Umbrella Talk"
            />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {action === "welcome" ? 'Welcome to Umbrella Talk' : action === "login" ? "Login to your account" : "Register for an account" }
            </h2>
            <p className="mt-5 text-center">
                {action === "welcome" ? "Step into Umbrella Talk, your sanctuary for uninterrupted conversation." : action === "login" ? "Login to Umbrella Talk, your sanctuary for uninterrupted conversation." : "Register to Umbrella Talk, your sanctuary for uninterrupted conversation."}
              </p>
              <p className="mt-2 text-center text-sm text-gray-500">
                {action === "welcome" ? '' : action === "login" ? (
                  <>
                    New to Umbrella Talk? <span className="font-semibold text-orange-500 hover:text-orange-600"><Link to="/register">Register</Link></span> 
                  </>
                ) : (
                  <>
                    Already have an account? <span className="font-semibold text-orange-500 hover:text-orange-600"><Link to="/login">Login</Link></span> 
                  </>
                )}
              </p>
            </div>
        </div>
      </>
    )
  }
  
  
  