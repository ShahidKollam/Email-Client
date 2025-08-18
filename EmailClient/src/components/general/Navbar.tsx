"use client"

import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../redux/store"
import { logout } from "../../redux/slice/userSlice" // Import the logout action
import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import useCloseMenu from "../../hooks/useCloseMenu"

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const menuRef = useRef(null)
  useCloseMenu(menuRef, () => setIsDropdownOpen(false))

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-purple-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto py-2 flex justify-between items-center">
        {/* Logo Section */}
        <div>
          <h1 className="text-xl font-bold">Template Pro</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="hover:bg-blue-700 px-3 py-2 rounded transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/custom-templates"
            className="hover:bg-blue-700 px-3 py-2 rounded transition duration-300 ease-in-out"
          >
            Templates
          </Link>
          <Link
            to="/editor"
            className="hover:bg-blue-700 px-3 py-2 rounded transition duration-300 ease-in-out"
          >
            Editor
          </Link>
          <Link
            to="/doc-page"
            className="hover:bg-blue-700 px-3 py-2 rounded transition duration-300 ease-in-out"
          >
            Docs
          </Link>
        </div>

        {/* User Profile or Login */}
        <div className="relative flex items-center space-x-4">
          {user.name ? (
            <div className="relative">
              {/* Profile Icon */}
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <FaUserCircle size={24} className="text-white" />
                <span className="text-white font-medium">{user.name}</span>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-40 bg-gray-900 text-white shadow-xl rounded-lg border border-gray-700 text-center"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-700 rounded-t-lg transition duration-300 ease-in-out"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-700 transition duration-300 ease-in-out"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 hover:bg-gray-700 rounded-b-lg transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md transition duration-300 ease-in-out text-white">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
