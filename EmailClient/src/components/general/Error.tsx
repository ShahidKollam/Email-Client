"use client"

interface ErrorProps {
  message: string
  onRetry?: () => void
}

const Error = ({ message, onRetry }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center h-[60vh] bg-gray-900 text-white">
      <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p className="text-lg">{message}</p>
        {onRetry && (
          <button
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md"
            onClick={onRetry}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default Error
