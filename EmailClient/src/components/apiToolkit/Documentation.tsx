const Documentation = () => {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">API Documentation</h2>
      <p className="text-gray-600">
        Explore the complete API documentation to integrate our services seamlessly into your applications.
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-3">
        <li>
          <strong>Authentication:</strong> Learn how to authenticate using your API keys.
        </li>
        <li>
          <strong>Endpoints:</strong> Details about all available endpoints, parameters, and responses.
        </li>
        <li>
          <strong>Error Codes:</strong> Understand common errors and their solutions.
        </li>
      </ul>
      <a
        href="/doc-page"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition"
      >
        View Full Documentation &rarr;
      </a>
    </div>
  )
}

export default Documentation
