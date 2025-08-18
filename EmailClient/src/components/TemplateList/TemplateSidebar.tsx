import { Link } from "react-router-dom"

function TemplateSidebar() {
  const sidebarItems = [
    { to: "/dashboard", icon: "📊", label: "Home" },
    { to: "/api-toolkit", icon: "🛠️", label: "API Toolkit" },
    { to: "/automate-email", icon: "🔄", label: "Automate Email" },
    { to: "/custom-templates", icon: "📝", label: "Your Templates" },
    { to: "/editor", icon: "➕", label: "Build Template" },
    { to: "/clone-template", icon: "🌀", label: "Free Templates" }, // New link added
    { to: "/bulk-email", icon: "📧", label: "Email Marketing" },
    { to: "/settings", icon: "⚙️", label: "Settings" }, // changed from "#" → "/settings"
  ]

  return (
    <div className="w-64 bg-gray-900 text-white p-6 space-y-6 transition-all duration-300 ease-in-out relative">
      <h2 className="text-2xl font-semibold text-center text-indigo-400">
        Template Builder
      </h2>

      <ul className="space-y-4">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className="flex items-center space-x-3 text-gray-300 hover:text-indigo-400 transition-colors duration-300"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="absolute bottom-6 left-6 text-gray-400 text-sm">
        <p>v1.0 - Email Template Builder</p>
      </footer>
    </div>
  )
}

export default TemplateSidebar
