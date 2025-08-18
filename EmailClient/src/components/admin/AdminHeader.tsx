"use client"

import type React from "react"
import { useState } from "react"
import { FaUserCircle, FaBars, FaChevronDown, FaSearch } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../redux/store"
import { logout } from "../../redux/slice/userSlice"

const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <header className="border-b border-gray-700 bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 text-gray-100 flex justify-between items-center fixed top-0 left-0 w-full p-4 z-50 shadow-lg">
      {/* Sidebar Toggle */}
      <button className="md:hidden focus:outline-none hover:text-gray-400 transition duration-300">
        <FaBars size={24} />
      </button>

      {/* Page Title */}
      <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>

      {/* Search Bar */}
      <div className="hidden md:flex items-center w-1/3 bg-white rounded-full px-4 py-2 shadow-md">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="flex-grow bg-transparent focus:outline-none text-gray-800"
        />
        <button className="text-blue-600 hover:text-blue-800">
          <FaSearch size={20} />
        </button>
      </div>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-3 hover:text-gray-400 transition duration-300 focus:outline-none"
        >
          {/* Admin Icon */}
          <FaUserCircle size={28} className="text-white" />
          <span className="text-lg font-medium">{user.name}</span>
          <FaChevronDown
            size={16}
            className={`transform transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-md overflow-hidden animate-fade-in">
            <button className="block w-full text-left px-4 py-3 hover:bg-gray-100 font-medium">Profile</button>
            <button className="block w-full text-left px-4 py-3 hover:bg-gray-100 font-medium">Settings</button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default AdminHeader
