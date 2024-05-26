export default function WeclomePageHeader() {
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
              Welcome to Umbrella Talk
            </h2>
            <p className="mt-5 text-center">Step into Umbrella Talk, your sanctuary for uninterrupted conversation.</p>
            </div>
        </div>
      </>
    )
  }
  
  