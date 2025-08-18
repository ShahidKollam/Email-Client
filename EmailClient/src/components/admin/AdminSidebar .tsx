import { Link, useLocation } from "react-router-dom"
import { FaTachometerAlt, FaFileAlt, FaUsers, FaCog } from "react-icons/fa" // Import necessary icons from react-icons

const AdminSidebar = () => {
  const location = useLocation()

  const menuItems = [
    { name: "Dashboard", path: "/admin/", icon: <FaTachometerAlt /> },
    { name: "Templates", path: "/admin/templates", icon: <FaFileAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ]

  return (
    <aside className="bg-gray-800 text-gray-200 w-64 min-h-screen fixed z-10 top-16">
      <nav className="mt-4">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={`flex items-center px-4 py-3 hover:bg-gray-700 ${
              location.pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {/* Display icon next to the menu text */}
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar
